import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import JoinProject from "./pages/JoinProject.tsx";
import StartProject from "./pages/StartProject.tsx";
import Workspace from "./pages/Workspace.tsx";
import Auth from "./pages/Auth.tsx";
import SeekerDashboard from "./pages/SeekerDashboard.tsx";
import CreatorDashboard from "./pages/CreatorDashboard.tsx";
import ApplicationsInbox from "./pages/ApplicationsInbox.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/join" element={<JoinProject />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/seeker" element={<SeekerDashboard />} />
          <Route path="/dashboard/creator" element={<CreatorDashboard />} />
          <Route path="/dashboard/creator/applications" element={<ApplicationsInbox />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
