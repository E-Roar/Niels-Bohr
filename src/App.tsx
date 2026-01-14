import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PWAPrompt } from "@/components/PWAPrompt";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { SiteProvider } from "@/contexts/SiteContext";
import { AuthProvider, ProtectedRoute } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import SiteSettings from "./pages/admin/SiteSettings";
import HeroSettings from "./pages/admin/HeroSettings";
import AboutSettings from "./pages/admin/AboutSettings";
import ProgramsSettings from "./pages/admin/ProgramsSettings";
import GallerySettings from "./pages/admin/GallerySettings";
import ContactSettings from "./pages/admin/ContactSettings";
import ChatbotSettings from "./pages/admin/ChatbotSettings";

const App = () => (
  <LanguageProvider>
    <SiteProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PWAPrompt />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="site" element={<SiteSettings />} />
                <Route path="hero" element={<HeroSettings />} />
                <Route path="about" element={<AboutSettings />} />
                <Route path="programs" element={<ProgramsSettings />} />
                <Route path="gallery" element={<GallerySettings />} />
                <Route path="contact" element={<ContactSettings />} />
                <Route path="chatbot" element={<ChatbotSettings />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </SiteProvider>
  </LanguageProvider>
);

export default App;
