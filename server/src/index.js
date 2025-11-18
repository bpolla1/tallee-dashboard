import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// Initialize Google Sheets API
// Support both file-based (local) and environment variable-based (production) credentials
let auth;
if (process.env.GOOGLE_CREDENTIALS) {
  // Production: Use credentials from environment variable (JSON string)
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
} else {
  // Local development: Use credentials file
  auth = new google.auth.GoogleAuth({
    keyFile: join(__dirname, '../credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

const sheets = google.sheets({ version: 'v4', auth });

// Helper function to parse sheet data into objects
function parseSheetData(values) {
  if (!values || values.length === 0) return [];
  
  const headers = values[0];
  const rows = values.slice(1).filter(row => row && row.some(cell => cell));
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
}

// Helper to find section in sheet data
function findSection(values, sectionName) {
  const sectionIndex = values.findIndex(row => 
    row && row[0] && row[0].toUpperCase().includes(sectionName.toUpperCase())
  );
  if (sectionIndex === -1) return null;
  return values.slice(sectionIndex);
}

// API Route: Main Dashboard
app.get('/api/main-dashboard', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Main Dashboard!A:Z',
    });

    const values = response.data.values || [];
    
    // Parse Overall Mention Rate
    const overallRateRow = values.find(row => row[0] === 'Overall Mention Rate (%)');
    const overallRate = overallRateRow && values[values.indexOf(overallRateRow) + 1] 
      ? parseFloat(values[values.indexOf(overallRateRow) + 1][0]) || 22 
      : 22;
    
    const overallChangeRow = values.find(row => row[0] === 'Overall Mention Rate Change (%)');
    const overallChange = overallChangeRow && values[values.indexOf(overallChangeRow) + 1]
      ? parseFloat(values[values.indexOf(overallChangeRow) + 1][1]) || 7
      : 7;

    // Parse Competitor Rates
    const competitorsStart = values.findIndex(row => row[0] === 'Competitor Name');
    const competitors = [];
    if (competitorsStart !== -1) {
      for (let i = competitorsStart + 1; i < values.length; i++) {
        if (values[i] && values[i][0] && values[i][0] !== 'CHART DATA') {
          if (values[i][0] === 'Lowe\'s' || values[i][0] === 'Home Depot') {
            competitors.push({
              name: values[i][0],
              rate: parseFloat(values[i][1]) || 0
            });
          }
        } else {
          break;
        }
      }
    }

    // Parse Chart Data
    const chartStart = values.findIndex(row => row[0] === 'Lowe\'s' && row[1] === 'Home Depot');
    const chartData = [];
    if (chartStart !== -1) {
      for (let i = chartStart + 1; i < values.length; i++) {
        if (values[i] && values[i][0] && values[i][1]) {
          const lowes = parseFloat(values[i][0]);
          const homeDepot = parseFloat(values[i][1]);
          if (!isNaN(lowes) && !isNaN(homeDepot)) {
            chartData.push({
              day: String(i - chartStart),
              user: lowes,
              competitor: homeDepot
            });
          }
        }
      }
    }

    res.json({
      overallRate,
      overallChange,
      competitors: competitors.length > 0 ? competitors : [
        { name: 'Home Depot', rate: 84 },
        { name: "Lowe's", rate: 56 }
      ],
      chartData: chartData.length > 0 ? chartData : []
    });
  } catch (error) {
    console.error('Error fetching main dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

// API Route: Competitors Info
app.get('/api/competitors', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Competitors!A:Z',
    });

    const values = response.data.values || [];
    const data = parseSheetData(values.filter(row => 
      row && row[0] && row[0] !== 'COMPETITOR INFORMATION' && 
      row[0] !== 'NOTES:' && !row[0].startsWith('-') &&
      row[0] !== 'Competitor Name'
    ));

    res.json({ data });
  } catch (error) {
    console.error('Error fetching competitors:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// API Route: Category Data
app.get('/api/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${categoryName}!A:Z`,
    });

    const values = response.data.values || [];
    
    // Parse Category Metadata
    const metadataStart = values.findIndex(row => 
      row && row[0] && row[0].includes('CATEGORY METADATA')
    );
    const metadataHeaders = metadataStart !== -1 && values[metadataStart + 2]
      ? values[metadataStart + 2]
      : [];
    const metadataRow = metadataStart !== -1 && values[metadataStart + 3]
      ? values[metadataStart + 3]
      : [];

    const metadata = {};
    metadataHeaders.forEach((header, index) => {
      if (header) {
        const key = header.replace(/[()%]/g, '').trim().toLowerCase().replace(/\s+/g, '');
        metadata[key] = metadataRow[index] || '';
      }
    });

    // Parse Competitor Totals
    const totalsStart = values.findIndex(row => 
      row && row[0] && row[0].includes('COMPETITOR TOTALS')
    );
    const competitorData = [];
    if (totalsStart !== -1) {
      const headerRow = values.find((row, idx) => 
        idx > totalsStart && row && row[0] === 'Competitor Name'
      );
      if (headerRow) {
        const headerIndex = values.indexOf(headerRow);
        for (let i = headerIndex + 1; i < values.length; i++) {
          if (values[i] && values[i][0] && values[i][0] !== 'PROMPT QUESTIONS') {
            competitorData.push({
              name: values[i][0],
              value: parseFloat(values[i][1]) || 0,
              color: values[i][0] === 'Home Depot' ? '#ff6600' : '#004990'
            });
          } else {
            break;
          }
        }
      }
    }

    // Parse Prompts
    const promptsStart = values.findIndex(row => 
      row && row[0] && row[0].includes('PROMPT QUESTIONS')
    );
    const phrases = [];
    if (promptsStart !== -1) {
      const headerRow = values.find((row, idx) => 
        idx > promptsStart && row && row[0] === 'Prompt Question'
      );
      if (headerRow) {
        const headerIndex = values.indexOf(headerRow);
        for (let i = headerIndex + 1; i < values.length; i++) {
          if (values[i] && values[i][0] && values[i][0] && !values[i][0].includes('NOTES')) {
            phrases.push({
              phrase: values[i][0],
              userVisibility: parseFloat(values[i][1]) || 0,
              competitorVisibility: parseFloat(values[i][2]) || 0
            });
          } else {
            break;
          }
        }
      }
    }

    res.json({
      metadata,
      competitorData,
      phrases
    });
  } catch (error) {
    console.error(`Error fetching category ${categoryName}:`, error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// API Route: Metrics
app.get('/api/metrics', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Metrics!A:Z',
    });

    const values = response.data.values || [];
    const data = parseSheetData(values.filter(row => 
      row && row[0] && row[0] !== 'METRICS DATA' && 
      row[0] !== 'METRIC VALUES' && row[0] !== 'NOTES:' &&
      !row[0].startsWith('-') && row[0] !== 'Metric Name'
    ));

    res.json({ data });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Spreadsheet ID: ${SPREADSHEET_ID}`);
});

