import { Outlet } from "react-router-dom";
import Banner from "../banner/Banner";
function AuthLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Banner />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
