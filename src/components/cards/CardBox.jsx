import { useState, useEffect, memo } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import styles from "./cardbox.module.css";
import Card from "./Card";
import Modal from "react-modal";
import CardModal from "../modals/CardModal";
import { Toaster } from "react-hot-toast";
import userTaskService from "../../redux/features/userTask/userTaskService";

function CardBox({ status, filter, setRefresh, refresh }) {
  const [collapse, setCollapse] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "550px",
      height: "450px",
      padding: "30px",
      borderRadius: "20px",
      transform: "translate(-50%, -50%)",
    },
  };

  const fetchCardsData = async () => {
    try {
      const response = await userTaskService.getCards(
        filter.toLowerCase().replace(/\s/g, ""),
        status.toLowerCase().replace(/\s/g, "")
      );
      setCardsData(response.data);
    } catch (error) {
      console.error("Error fetching cards data:", error);
    }
  };
  useEffect(() => {
    fetchCardsData();
  }, [filter, status, refresh]);

  return (
    <div className={styles.cardBox}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.cardBoxGroup}>
        <div style={{ fontWeight: "600" }}>{status}</div>
        <div>
          {status === "To do" ? (
            <IoIosAdd
              size={"23px"}
              style={{ cursor: "pointer" }}
              onClick={() => setModalOpen(true)}
            />
          ) : (
            <></>
          )}
          <VscCollapseAll
            size={"20px"}
            color="#767575"
            style={{ cursor: "pointer" }}
            onClick={() => setCollapse(false)}
          />
        </div>
      </div>
      <div>
        <Modal
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          ariaHideApp={false}
        >
          <CardModal
            handleModelClose={() => setModalOpen(false)}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal>
      </div>
      <div className={styles.cardList}>
        {cardsData.length > 0 ? (
          cardsData?.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              priority={card.priority}
              title={card.title}
              tasks={card.tasks}
              dueDate={card.dueDate}
              status={card.status}
              assignee={card.assignee}
              collapse={collapse}
              handleCollapse={() => setCollapse(true)}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CardBox;
