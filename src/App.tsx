import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoModal } from './components/demos/DemoModal';
import { HomePage } from './pages/public/HomePage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { IndustriesPage } from './pages/public/IndustriesPage';
import { DemosPage } from './pages/public/DemosPage';
import { PricingPage } from './pages/public/PricingPage';
import { EcommerceDemosPage } from './pages/public/EcommerceDemosPage';
import { AiAutomationDemosPage } from './pages/public/AiAutomationDemosPage';
import { AboutPage } from './pages/public/AboutPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import { ContactPage } from './pages/public/ContactPage';
import { BookConsultationPage } from './pages/public/BookConsultationPage';
import { ReferencesPage } from './pages/public/ReferencesPage';

// Admin Page Imports
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminDemosManager } from './pages/admin/AdminDemosManager';
import { AdminIndustriesManager } from './pages/admin/AdminIndustriesManager';
import { AdminServicesManager } from './pages/admin/AdminServicesManager';
import { AdminPricingManager } from './pages/admin/AdminPricingManager';
import { AdminOrdersManager } from './pages/admin/AdminOrdersManager';
import { AdminLeadsManager } from './pages/admin/AdminLeadsManager';
import { AdminBookingsManager } from './pages/admin/AdminBookingsManager';
import { AdminCommentsManager } from './pages/admin/AdminCommentsManager';
import { AdminBlogManager } from './pages/admin/AdminBlogManager';
import { AdminMediaManager } from './pages/admin/AdminMediaManager';
import { AdminTeamManager } from './pages/admin/AdminTeamManager';
import { AdminSettingsManager } from './pages/admin/AdminSettingsManager';
import { AdminReferencesPage } from './pages/admin/AdminReferencesPage';
import { AdminDatabasePage } from './pages/admin/AdminDatabasePage';

const PageRenderer: React.FC = () => {
  const { currentRoute, isAdminAuthenticated } = useData();

  // Authentication Guard for Protected Admin Routes
  if (currentRoute.startsWith('/admin') && currentRoute !== '/admin/login') {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }
  }

  switch (currentRoute) {
    // Public Routes
    case '/':
      return <HomePage />;
    case '/solutions':
      return <SolutionsPage />;
    case '/industries':
      return <IndustriesPage />;
    case '/demos':
      return <DemosPage />;
    case '/pricing':
      return <PricingPage />;
    case '/demos/ecommerce':
      return <EcommerceDemosPage />;
    case '/demos/ai-automation':
      return <AiAutomationDemosPage />;
    case '/references':
      return <ReferencesPage />;
    case '/about':
      return <AboutPage />;
    case '/resources':
      return <ResourcesPage />;
    case '/contact':
      return <ContactPage />;
    case '/book-consultation':
      return <BookConsultationPage />;

    // Admin Routes
    case '/admin/login':
      return <AdminLoginPage />;
    case '/admin/dashboard':
      return <AdminDashboardOverview />;
    case '/admin/demos':
      return <AdminDemosManager />;
    case '/admin/industries':
      return <AdminIndustriesManager />;
    case '/admin/services':
      return <AdminServicesManager />;
    case '/admin/pricing':
      return <AdminPricingManager />;
    case '/admin/orders':
      return <AdminOrdersManager />;
    case '/admin/leads':
      return <AdminLeadsManager />;
    case '/admin/bookings':
      return <AdminBookingsManager />;
    case '/admin/comments':
      return <AdminCommentsManager />;
    case '/admin/blog':
      return <AdminBlogManager />;
    case '/admin/media':
      return <AdminMediaManager />;
    case '/admin/team':
      return <AdminTeamManager />;
    case '/admin/settings':
      return <AdminSettingsManager />;
    case '/admin/references':
      return <AdminReferencesPage />;
    case '/admin/database':
      return <AdminDatabasePage />;

    default:
      return <HomePage />;
  }
};

const MainApp: React.FC = () => {
  const { currentRoute } = useData();
  const isAdminRoute = currentRoute.startsWith('/admin') && currentRoute !== '/admin/login';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <PageRenderer />
      </main>
      {!isAdminRoute && <Footer />}
      <DemoModal />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
