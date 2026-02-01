import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Documents } from '../components/pages/Documents';
import { DocumentView } from '../components/pages/DocumentView';
import { AITools } from '../components/pages/AITools';
import { Analytics } from '../components/pages/Analytics';
import { History } from '../components/pages/History';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/documents" replace />,
  },
  {
    path: '/documents',
    element: <Documents />,
  },
  {
    path: '/document/:id',
    element: <DocumentView />,
  },
  {
    path: '/doc/:id',
    element: <DocumentView />,
  },
  {
    path: '/ai-tools',
    element: <AITools />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '/history',
    element: <History />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
