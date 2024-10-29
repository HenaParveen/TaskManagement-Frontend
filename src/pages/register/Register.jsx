import { useEffect, useState } from "react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiUser, CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/features/userTask/userTaskSlice";
function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.userTask);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(true);
    setTimeout(() => {
      setShowConfirmPassword(false);
    }, 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      registerData.name.trim() === "" ||
      registerData.email.trim() === "" ||
      registerData.password.trim() === "" ||
      registerData.cPassword.trim() === ""
    ) {
      return;
    }
    if (registerData.password !== registerData.cPassword) {
      toast("Passwords must match", {
        icon: "⚠️",
      });
      return;
    }

    const userData = {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
    };
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", user?.JWT_Token);
      navigate("/");
    }
  }, [isLoggedIn, navigate, user?.JWT_Token]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.registerContainer}>
        <p>Register</p>
        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <CiUser className={styles.userIcon} color="#828282" size={"33px"} />
            <input
              type="text"
              placeholder="Name"
              spellCheck="false"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              required
            />
            <MdOutlineLocalPostOffice
              className={styles.postIcon}
              color="#828282"
              size={"33px"}
            />
            <input
              type="email"
              placeholder="Email"
              required
              spellCheck="false"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
            />
            <CiLock
              className={styles.lockIcon1}
              color="#828282"
              size={"33px"}
            />
            <input
              style={{ paddingRight: "50px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
            />
            {showPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon1}
                color="#828282"
                size={"23px"}
                onClick={handlePasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon1}
                color="#828282"
                size={"23px"}
                onClick={handlePasswordVisibility}
              />
            )}
            <CiLock
              className={styles.lockIcon2}
              color="#828282"
              size={"33px"}
            />
            <input
              style={{ paddingRight: "50px" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="cPassword"
              value={registerData.cPassword}
              onChange={handleInputChange}
            />
            {showConfirmPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleConfirmPasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleConfirmPasswordVisibility}
              />
            )}
          </div>
          <button className={styles.registerBtn} type="submit">
            Register
          </button>
        </form>
        <span>Have an account?</span>
        <button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
