import { useEffect, useState } from "react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userTask/userTaskSlice";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.userTask);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const userData = {
      email: loginData.email,
      password: loginData.password,
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", user?.JWT_Token);
      navigate("/");
    }
  }, [isLoggedIn, navigate, user?.JWT_Token]);
  return (
    <div>
      <form onSubmit={handleLogin} className={styles.loginContainer}>
        <Toaster position={"top-center"} />
        <p>Login</p>
        <div className={styles.inputGroup}>
          <MdOutlineLocalPostOffice
            className={styles.postIcon}
            color="#828282"
            size={"33px"}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            spellCheck="false"
            value={loginData.email}
            onChange={handleInputChange}
          />
          <CiLock className={styles.lockIcon} color="#828282" size={"33px"} />
          <input
            style={{ paddingRight: "50px" }}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={loginData.password}
            onChange={handleInputChange}
          />
          {showPassword ? (
            <FiEyeOff
              className={styles.eyeOffIcon}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          ) : (
            <FiEye
              className={styles.eyeOnIcon}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          )}
        </div>
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
        <span>Have no account yet?</span>
        <button
          className={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
