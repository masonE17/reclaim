import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import BrowsePage from './pages/BrowsePage.tsx'
import ListingPage from './pages/ListingPage.tsx'
import SellPage from './pages/SellPage.tsx'
import MyListingsPage from './pages/MyListingsPage.tsx'
import MessagesPage from './pages/MessagesPage.tsx'
import CartPage from './pages/CartPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import DevAuthPage from "./pages/DevAuthPage.tsx";

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
    path: "/my-listings",
    element: <MyListingsPage />,
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
  {
  path: "/dev-auth",
  element: import.meta.env.DEV
    ? <DevAuthPage />
    : <div>Not found</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
