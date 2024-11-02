import { Link } from "react-router-dom";
import styles from "./pagenotfound.module.css";

const PageNotFound = () => {
  return (
    <section style={{ height: "80vh" }}>
      <div className={styles.centerAll}>
        <h2>Page not found</h2>
        <p>Looks like the page you are looking for could not be found</p>
        <br />
        <Link to="/">
          <button className={styles.btn}>Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
