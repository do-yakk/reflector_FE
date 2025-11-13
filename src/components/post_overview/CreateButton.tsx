import type React from "react";
import styles from "./CreateButton.module.css";
import { useNavigate } from "react-router-dom";

const CreateButton: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className={styles.post}>
            <div className={styles.plus} onClick={() => navigate("/create-post")}>+</div>
        </div>
    );
}

export default CreateButton;