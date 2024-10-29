import robo from "..//../assets/Art.png";
import styles from "./banner.module.css";
function Banner() {
  return (
    <div className={styles.bannerComponent}>
      <div className={styles.sphere}></div>
      <img src={robo} alt="robo.png" />
      <p className={styles.p1}>Welcome aboard my friend</p>
      <p className={styles.p2}>Just a couple of clicks and we start</p>
    </div>
  );
}

export default Banner;
