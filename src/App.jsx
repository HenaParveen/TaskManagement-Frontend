import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Loader from "./components/loaders/Loader";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";

const AppLayout = lazy(() => import("./components/layouts/AppLayout"));
const AuthLayout = lazy(() => import("./components/layouts/AuthLayout"));
//const ViewCard = lazy(() => import("./pages/viewCard/ViewCard"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <Suspense fallback={<Loader />}>
              <AppLayout />
            </Suspense>
          }
        >
          {/* Child of AppLayout */}
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path={"/"}
          element={
            <Suspense fallback={<Loader />}>
              <AuthLayout />
            </Suspense>
          }
        >
          {/* Child Route of AuthLayoutRoute */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* <Route
          path={"/view/:cardId"}
          element={
            <Suspense fallback={<Loader />}>
              <ViewCard />
            </Suspense>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
