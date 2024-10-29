import styles from "./analytics.module.css";
import { useSelector } from "react-redux";
function Analytics() {
  const { analytics } = useSelector((state) => state.userTask);
  return (
    <div className={styles.analyticsContainer}>
      <p>Analytics</p>
      <div className={styles.boxContainer}>
        <div className={styles.box1}>
          <ul>
            <li>Backlog Tasks</li>
            <li>To-Do Tasks</li>
            <li>In-Progress Tasks</li>
            <li>Completed Tasks</li>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <li>{analytics?.statusAnalytics?.["backlog"] || 0}</li>
            <li>{analytics?.statusAnalytics?.["todo"] || 0}</li>
            <li>{analytics?.statusAnalytics?.["progress"] || 0}</li>
            <li>{analytics?.completedTasks || 0}</li>
          </ul>
        </div>
        <div className={styles.box2}>
          <ul>
            <li>Low Priority</li>
            <li>Moderate Priority</li>
            <li>High Priority</li>
            <li>Due Date Tasks</li>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <li>{analytics?.priorityAnalytics?.["low"] || 0}</li>
            <li>{analytics?.priorityAnalytics?.["moderate"] || 0}</li>
            <li>{analytics?.priorityAnalytics?.["high"] || 0}</li>
            <li>{analytics?.cardsWithDueDate || 0}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
