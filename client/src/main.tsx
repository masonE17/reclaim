import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import BrowsePage from './pages/BrowsePage.tsx'
import ListingPage from './pages/ListingPage.tsx'
import SellPage from './pages/SellPage.tsx'
import MessagesPage from './pages/MessagesPage.tsx'
import CartPage from './pages/CartPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/browse",
    element: <BrowsePage />,
  },
  {
    path: "/listing/:id",
    element: <ListingPage />,
  },
  {
    path: "/sell",
    element: <SellPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
