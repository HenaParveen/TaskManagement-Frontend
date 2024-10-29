import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const { isLoggedIn } = useSelector((state) => state.userTask);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
export default AppLayout;
