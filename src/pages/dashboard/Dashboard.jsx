import { useState } from "react";
import styles from "./dashboard.module.css";
import { format } from "date-fns";
import Arrow from "..//../assets/Vector 14.svg";
import CardBox from "../../component/cards/CardBox";
import { useSelector } from "react-redux";

import { GoPersonAdd } from "react-icons/go";
import Modal from "react-modal";
import { checkEmail } from "../../utils/helper";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateAssignee } from "../../redux/features/userTask/userTaskSlice";

function Dashboard() {
  const currentDate = format(new Date(), "do MMM, yyyy");
  const [dropDown, setDropDown] = useState(false);
  const [selectedFilter, setSelectedOption] = useState("This Week");
  const [assignee, setAssignee] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useSelector((state) => state.userTask);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropDown(false);
    return option;
  };

  const renderCardBoxes = () => {
    return ["Backlog", "To do", "Progress", "Done"].map((statusName) => (
      <CardBox
        key={statusName}
        status={statusName}
        filter={selectedFilter}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    ));
  };

  const handleSharePeople = () => {
    const checkEmailFormat = checkEmail(assignee);
    if (!checkEmailFormat) {
      toast.error("Please provide a valid email address");
      return;
    }
    const assigneeData = {
      email: assignee,
    };
    dispatch(updateAssignee(assigneeData));
    setSuccessMessage(`${assignee} added to the board`);
    setAssignee("");
  };

  const handleOkay = () => {
    setSuccessMessage("");
    setModalOpen(false);
    setAssignee("");
    setRefresh(!refresh);
  };

  const customStyles = {
    content: {
      width: "400px",
      height: "200px",
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

  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Modal isOpen={modalOpen} style={customStyles}>
        {!successMessage && (
          <div>
            <h3>Add People to the board</h3>
            <input
              type="text"
              name="peopleEmail"
              placeholder="Enter the email"
              className={styles.peopleEmail}
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              <button className={styles.cancelBtn} onClick={onModalClose}>
                Cancel
              </button>
              <button
                className={styles.continueBtn}
                onClick={handleSharePeople}
              >
                Add Email
              </button>
            </div>
          </div>
        )}
        {successMessage && ( // Conditionally render the success message
          <div className={styles.successContent}>
            <div className={styles.successMessage}>{successMessage}</div>
            <button className={styles.successBtn} onClick={handleOkay}>
              Okay, got it
            </button>
          </div>
        )}
      </Modal>
      <p style={{ fontSize: "18px", fontWeight: "500", marginLeft: "10px" }}>
        Welcome! {user?.name}
        {}
      </p>
      <p className={styles.date}>{currentDate}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "550",
              marginTop: "-3px",
              marginLeft: "10px",
            }}
          >
            Board
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "300",
              marginTop: "-3px",
              marginLeft: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          >
            <GoPersonAdd size={20} /> Add People
          </span>
        </div>

        <div className={styles.dropDown} onClick={handleDropDown}>
          {selectedFilter}
          <img src={Arrow} alt="dropdown" />
        </div>
        {dropDown ? (
          <div className={styles.dropDownList}>
            <div onClick={() => handleOptionChange("Today")}>Today</div>
            <div onClick={() => handleOptionChange("This Week")}>This Week</div>
            <div onClick={() => handleOptionChange("This Month")}>
              This Month
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.cardsContainer}>{renderCardBoxes()}</div>
    </div>
  );
}

export default Dashboard;
