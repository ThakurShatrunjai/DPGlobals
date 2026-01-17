import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// Lazy load pages for code-splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const MediaPressPage = lazy(() => import('./pages/MediaPressPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Create root route
const rootRoute = createRootRoute();

// Create route tree with lazy-loaded components
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const mediaPressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/media-press',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MediaPressPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPanel />
    </Suspense>
  ),
});

// Create router with GitHub Pages support
// The basepath is configured via import.meta.env.BASE_URL which Vite sets automatically
// For GitHub Pages: set base: '/repository-name/' in vite.config.js
const routeTree = rootRoute.addChildren([homeRoute, mediaPressRoute, adminRoute]);
const router = createRouter({ 
  routeTree,
  basepath: import.meta.env.BASE_URL || '/',
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
