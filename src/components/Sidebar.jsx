import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <aside className=" w-64 min-h-screen  bg-slate-800 text-white flex flex-col rounded-br-xl">
      <div className="sticky top-5">
        <div className="p-12 ">
          <h1 className="text-3xl font-bold">Data Mahasiswa</h1>
        </div>
        <nav className="flex flex-col gap-4 px-4">
          <a
            href="#"
            className="hover:bg-gray-700 px-4 py-2 rounded-md transition">
            Dashboard
          </a>
          <a
            href="#"
            className="hover:bg-gray-700 px-4 py-2 rounded-md transition">
            Data
          </a>
          <a
            href="#"
            className="hover:bg-gray-700 px-4 py-2 rounded-md transition">
            Settings
          </a>
          {token ? (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogout}>Login</Button>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
