import type React from "react";
import styles from "./CreateButton.module.css";

const CreateButton: React.FC = () => {
    return (
        <div className={styles.post}>
            <div className={styles.plus}>+</div>
        </div>
    );
}

export default CreateButton;