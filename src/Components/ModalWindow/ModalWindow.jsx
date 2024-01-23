import React from "react";
import classes from "./ModalWindow.module.scss";

const ModalWindow = ({ children, closeEditWindow }) => {
    const overlayModalClickHandler = () => closeEditWindow();
    const modalContentClickHandler = (e) => e.stopPropagation();

    return (
        <div
            className={classes.modal}
            onClick={overlayModalClickHandler}>
            <div
                className={classes.modalContent}
                onClick={modalContentClickHandler}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
