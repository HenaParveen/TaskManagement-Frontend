import { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { CiLock, CiUser } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/userTask/userTaskSlice";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { user, isLoggedIn, isSuccess } = useSelector(
    (state) => state.userTask
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    name: user?.name,
    email: user?.email,
    oldPassword: "",
    newPassword: "",
  });
  const { name, email, oldPassword, newPassword } = updatedData;

  const handleOldPasswordVisibility = () => {
    setShowOldPassword(true);
    setTimeout(() => {
      setShowOldPassword(false);
    }, 2000);
  };

  const handleNewPasswordVisibility = () => {
    setShowNewPassword(true);
    setTimeout(() => {
      setShowNewPassword(false);
    }, 2000);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateForm = () => {
    const { name, oldPassword, newPassword } = updatedData;
    if (!name && !oldPassword && !newPassword) {
      toast.error("Atleast one field is required to update");
      return false;
    }
    if (newPassword && !oldPassword) {
      toast.error("Old Password is required");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        name,
        email,
        newPassword: newPassword,
        currentPassword: oldPassword,
      };
      await dispatch(updateUser(userData));
    }
  };

  useEffect(() => {
    if (!isLoggedIn && isSuccess) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.settingsContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <p>Settings</p>
        <div className={styles.inputGroup}>
          <span>
            <CiUser size={"28px"} className={styles.Icon1} />
          </span>
          <input
            type="text"
            name="name"
            spellCheck="false"
            placeholder="Name"
            value={updatedData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <span>
            <MdOutlineEmail size={"28px"} className={styles.Icon1} />
          </span>
          <input
            type="text"
            name="email"
            spellCheck="false"
            placeholder="Update Email"
            value={updatedData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <span>
            <CiLock size={"30px"} className={styles.Icon2} />
          </span>
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            spellCheck="false"
            placeholder="Old Password"
            value={updatedData.oldPassword}
            onChange={handleInputChange}
          />
          <span>
            {showOldPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon1}
                color="#828282"
                size={"23px"}
                onClick={handleOldPasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon1}
                color="#828282"
                size={"23px"}
                onClick={handleOldPasswordVisibility}
              />
            )}
          </span>
        </div>
        <div className={styles.inputGroup}>
          <span>
            <CiLock size={"30px"} className={styles.Icon3} />
          </span>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            spellCheck="false"
            placeholder="New Password"
            value={updatedData.newPassword}
            onChange={handleInputChange}
          />
          <span>
            {showNewPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleNewPasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleNewPasswordVisibility}
              />
            )}
          </span>
        </div>
        <button type="submit" className={styles.updateBtn}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Settings;
