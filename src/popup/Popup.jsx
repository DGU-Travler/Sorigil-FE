import React from "react";
import styles from "./Popup.module.css";
function Popup() {
  return (
    <div className={styles.menuContainer}>
      <ul>
        <li>메뉴1</li>
        <br />
        <li>메뉴2</li>
        <br />
        <li>메뉴3</li>
      </ul>
    </div>
  );
}
export default Popup;
