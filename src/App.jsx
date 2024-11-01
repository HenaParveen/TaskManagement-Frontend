import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* How Many Page are there */
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Loader from "./component/loaders/Loader";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";

/* Do Lazy Loading for required things */
const AppLayout = lazy(() => import("./component/layouts/AppLayout"));
const AuthLayout = lazy(() => import("./component/layouts/AuthLayout"));
const ShowCard = lazy(() => import("./pages/showCard/ShowCard"));

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
        <Route
          path={"/show/:cardId"}
          element={
            <Suspense fallback={<Loader />}>
              <ShowCard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
