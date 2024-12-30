import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import DataMahasiswa from "../pages/DataMahasiswa";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DataMahasiswa />,
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
]);

export default router;
