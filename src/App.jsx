import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Loader from "./components/loaders/Loader";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";
import PageNotFound from "./pages/404/PageNotFound";

import { useDispatch, useSelector } from "react-redux";
import { loginStatus, userInfo } from "./redux/features/userTask/userTaskSlice";

const AppLayout = lazy(() => import("./components/layouts/AppLayout"));
const AuthLayout = lazy(() => import("./components/layouts/AuthLayout"));
const ShowCard = lazy(() => import("./pages/showCard/ShowCard"));

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.userTask);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && !user) {
      dispatch(userInfo());
    }
  }, [dispatch, user, isLoggedIn]);
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
