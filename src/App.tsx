import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import WriteArticle from "./pages/WriteArticle";
import ViewArticle from "./pages/ViewArticle";
import HavenlyOpportunities from "./pages/HavenlyOpportunities";
import HavenlyWriteArticle from "./pages/HavenlyWriteArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('React Query Error:', error);
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Lowes Dashboard Routes */}
          <Route path="/lowes" element={<Navigate to="/lowes/dashboard" replace />} />
          <Route path="/lowes/dashboard" element={<Dashboard />} />
          <Route path="/lowes/opportunities" element={<Opportunities />} />
          <Route path="/lowes/opportunities/:id/write" element={<WriteArticle />} />
          <Route path="/lowes/opportunities/:id/view" element={<ViewArticle />} />
          
          {/* Havenly Dashboard Routes */}
          <Route path="/havenly" element={<Navigate to="/havenly/dashboard" replace />} />
          <Route path="/havenly/dashboard" element={<Dashboard account="havenly" />} />
          <Route path="/havenly/opportunities" element={<HavenlyOpportunities />} />
          <Route path="/havenly/opportunities/:id/write" element={<HavenlyWriteArticle />} />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/lowes/dashboard" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
