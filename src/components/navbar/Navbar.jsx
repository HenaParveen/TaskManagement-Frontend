import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

/* React Icons and SVG */
import logo from "..//../assets/codesandbox.svg";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GoDatabase } from "react-icons/go";

import {
  analyticsData,
  logout,
} from "../../redux/features/userTask/userTaskSlice";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

function Navbar() {
  const [activeLink, setActiveLink] = useState("board");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userTask);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    /* This will act to set the active link path */
    if (location.pathname === "/") {
      setActiveLink("board");
    } else if (location.pathname === "/analytics") {
      setActiveLink("analytics");
    } else if (location.pathname === "/settings") {
      setActiveLink("settings");
    }
  }, [location.pathname]);

  const fetchCardDetails = () => {};

  const fetchAnalytics = () => {
    dispatch(analyticsData());
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    setModalOpen(false);
  };

  const customStyles = {
    content: {
      width: "330px",
      height: "180px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "7px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div className={styles.navbar}>
      <Modal isOpen={modalOpen} style={customStyles}>
        <h3>Are you sure you want to Logout?</h3>
        <button className={styles.continueBtn} onClick={handleLogout}>
          Yes,Logout
        </button>
        <button
          className={styles.cancelBtn}
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>

      <div className={styles.navLinks}>
        <div className={styles.navGroup} style={{ marginTop: "20px" }}>
          <img src={logo} alt="logo" />
          <p style={{ fontWeight: "600", fontSize: "17px", color: "black" }}>
            Pro Manage
          </p>
        </div>
        <Link
          to={"/"}
          style={{ marginTop: "10px" }}
          className={`${styles.navGroup} ${
            activeLink === "board" ? styles.activeLink : ""
          }`}
          onClick={fetchCardDetails}
        >
          <MdOutlineSpaceDashboard size={"23px"} color="#707070" />
          <p>Board</p>
        </Link>
        <Link
          to={"/analytics"}
          className={`${styles.navGroup} ${
            activeLink === "analytics" ? styles.activeLink : ""
          }`}
          onClick={fetchAnalytics}
        >
          <GoDatabase size={"23px"} color="#707070" />
          <p>Analytics</p>
        </Link>
        <Link
          to={"/settings"}
          className={`${styles.navGroup} ${
            activeLink === "settings" ? styles.activeLink : ""
          }`}
        >
          <FiSettings size={"23px"} color="#707070" />
          <p>Settings</p>
        </Link>
      </div>

      <div
        className={styles.navGroup}
        style={{ marginBottom: "30%", cursor: "pointer" }}
        onClick={() => setModalOpen(true)}
      >
        <IoExitOutline size={"25px"} color="#CF3636" />
        <p style={{ color: "#CF3636" }}>Logout</p>
      </div>
    </div>
  );
}

export default Navbar;
