import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import DataMahasiswa from "../pages/DataMahasiswa";

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
    element: <DataMahasiswa />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
