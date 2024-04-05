import { Outlet } from "react-router-dom"; // Outlet is a placeholder component provided by React Router that renders the matched child route's component.

import { ToastContainer } from "react-toastify"; // used to display toast notifications in the application.

import "react-toastify/dist/ReactToastify.css"; // default styles for the toast notifications.
import Navigation from "./pages/Auth/Navigation";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}
