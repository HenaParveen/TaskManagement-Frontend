import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginStatus } from "../../redux/features/userTask/userTaskSlice";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const { isLoggedIn } = useSelector((state) => state.userTask);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginStatus());
    if (!isLoggedIn) navigate("/login");
  }, [dispatch, isLoggedIn, navigate]);

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
