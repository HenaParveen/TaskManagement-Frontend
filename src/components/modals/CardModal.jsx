import { useState, useEffect } from "react";
import styles from "./cardmodal.module.css";

import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";

import DatePicker from "react-datepicker";
import { format, addDays, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch } from "react-redux";

import {
  addCard,
  updateCard,
} from "../../redux/features/userTask/userTaskSlice";

const initialCardData = {
  title: "",
  priority: null,
  assignee: "",
  tasks: [],
  dueDate: "",
};
function CardModal({
  mode,
  cardId,
  handleModelClose,
  props,
  setRefresh,
  refresh,
}) {
  const priorities = {
    high: {
      color: "#FF2473",
      name: "High Priority",
      value: "high",
    },
    moderate: {
      color: "#18B0FF",
      name: "Moderate Priority",
      value: "moderate",
    },
    low: {
      color: "#63C05B",
      name: "Low Priority",
      value: "low",
    },
  };

  const prioritiesArray = Object.values(priorities);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalender, setShowCalender] = useState(false);
  const [dueDateButtonText, setDueDateButtonText] = useState("Select Due Date");
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [cardData, setCardData] = useState(initialCardData);
  const dispatch = useDispatch();
  const [assignees, setAssignees] = useState([
    { initials: "AK", email: "Akashgupta@gmail.com", isSelected: false },
    // ... other initial assignees
  ]);

  const suggestions = ["Apple", "Banana", "Orange", "Pineapple", "Grapes"];

  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { _id: Date.now(), content: "", isDone: false },
    ]);
  };
  const handleTaskChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };
  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority === selectedPriority ? null : priority);
    setCardData((prevData) => ({ ...prevData, priority }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = async (e) => {
    e.preventDefault();

    const updatedCardData = {
      ...cardData,
      tasks: tasks.map((task) => ({
        content: task.content,
        isDone: task.isDone,
      })),
      dueDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
    };
    setCardData(updatedCardData);
    if (mode === "edit") {
      await handleEditCard(updatedCardData);
    } else {
      await handleAdd(updatedCardData);
    }

    handleModelClose();
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (mode === "edit") {
      setCardData((prevData) => ({
        ...prevData,
        title: props?.title,
        status: props?.status,
        tasks: props?.tasks || [],
        priority: props?.priority,
        dueDate: props?.dueDate || null,
        assignee: props?.assignee || "",
      }));
      setSelectedPriority(props?.priority);
      setTasks(props?.tasks);
    }
  }, [mode, cardId]);

  const handleEditCard = async (cardData) => {
    await dispatch(updateCard({ cardId, cardData }));
  };
  const handleAdd = async (cardData) => {
    await dispatch(addCard(cardData));
  };

  return (
    <form onSubmit={handleSave} className={styles.cardModalContainer}>
      <div className={styles.form}>
        <div>
          <div className={styles.label}>
            Title <span>*</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            className={styles.titleInput}
            value={cardData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.label}>
            Select Priority <span>*</span>
          </div>
          <div>
            {prioritiesArray.map((item) => (
              <span
                className={`${styles.priorityBtn} ${
                  selectedPriority === item.value ? styles.activePriority : ""
                }`}
                key={item.value}
                onClick={() => handlePriorityClick(item.value)}
              >
                <span>
                  <GoDotFill
                    style={{ marginRight: "2px" }}
                    size={"14px"}
                    color={item.color}
                    className={styles.dotIcon}
                  />
                </span>
                <span style={{ marginRight: "5px", alignItems: "center" }}>
                  {item.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.assignGroup}>
          <div className={styles.label}>Assign to</div>
          <input
            type="text"
            name="assignee"
            placeholder="add a assignee"
            className={styles.titleInput}
            style={{ width: "80%" }}
            value={cardData.assignee}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className={styles.label}>
            Checklist({tasks.filter((task) => task.isDone).length}/
            {tasks.length})
          </div>
          <div className={styles.tasksContainer}>
            {tasks.map((task) => (
              <div key={task._id} className={styles.taskItem}>
                <input
                  type="checkbox"
                  className={styles.taskCheck}
                  id={`task-${task._id}`}
                  checked={task.isDone}
                  onChange={(e) =>
                    handleTaskChange(task._id, "isDone", e.target.checked)
                  }
                />
                <input
                  type="text"
                  className={styles.taskInput}
                  placeholder="Add Task Here"
                  id={`task-content-${task._id}`}
                  value={task.content}
                  onChange={(e) =>
                    handleTaskChange(task._id, "content", e.target.value)
                  }
                  required
                />
                <MdDelete
                  className={styles.deleteIcon}
                  color="red"
                  size={"23px"}
                  onClick={() => handleDeleteTask(task._id)}
                />
              </div>
            ))}
          </div>
          <p className={styles.addTask} onClick={addTask}>
            + Add task
          </p>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button
          className={styles.dueDateBtn}
          onClick={(e) => {
            e.preventDefault();
            setShowCalender(!showCalender);
          }}
        >
          {dueDateButtonText}
        </button>
        {showCalender ? (
          <div className={styles.datepicker}>
            <DatePicker
              inline
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              excludeDateIntervals={[
                {
                  start: subDays(new Date(), 100),
                  end: addDays(new Date(), 0),
                },
              ]}
              onChange={(date) => {
                setDueDateButtonText(format(date, "dd/MM/yyyy"));
                setSelectedDate(date);
                setShowCalender(false);
              }}
            />
          </div>
        ) : (
          ""
        )}
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            className={styles.cancelBtn}
            onClick={() => handleModelClose()}
          >
            Cancel
          </button>
          <button className={styles.saveBtn} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardModal;
