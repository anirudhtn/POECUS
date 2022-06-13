import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import AdminNavigationBar from "./AdminNavigationBar";

function Dashboard() {
  const nav = useNavigate();

  async function populateDashboard() {
    const res = await fetch("http://localhost:3000/studentUser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = res.json().data;
    console.log(data);
  }

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwt.decode(token);
        if (!user) {
          localStorage.removeItem("token");
          nav("/admin");
        } else {
          populateDashboard();
        }
      }
    };
    checkAuthorization();
  }, [nav]);

  return (
    <div className="h-screen grid grid-cols-5">
      <AdminNavigationBar />
      <div className="pl-10 col-span-3 m-10">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;
