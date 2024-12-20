import { useState } from "react";
import styles from "./settings.module.css";
import { CiLock, CiUser } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStatus,
  updateUser,
} from "../../redux/features/userTask/userTaskSlice";

function Settings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { user } = useSelector((state) => state.userTask);

  const dispatch = useDispatch();

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
    if (!name && !oldPassword && !newPassword) {
      toast.error("At least one field is required to update");
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

    const isNameChanged = name !== user?.name;
    const isEmailChanged = email !== user?.email;
    const isPasswordChanged = newPassword && oldPassword;

    const changesCount = [
      isNameChanged,
      isEmailChanged,
      isPasswordChanged,
    ].filter(Boolean).length;

    if (changesCount > 1) {
      toast.error("Please update only one field at a time.");
      return;
    }

    if ((newPassword && !oldPassword) || (!newPassword && oldPassword)) {
      toast.error(
        "Please provide both current and new password to update your password."
      );
      return;
    }

    let userData = {};

    if (isNameChanged) {
      userData = { name };
    } else if (isEmailChanged) {
      userData = { email };
    } else if (isPasswordChanged) {
      userData = {
        newPassword,
        currentPassword: oldPassword,
      };
    }

    if (validateForm()) {
      await dispatch(updateUser(userData));
    }
    if (isEmailChanged || isPasswordChanged) {
      dispatch(loginStatus());
    }
  };

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
