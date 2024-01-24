import React from "react";
import classes from "./ModalWindow.module.scss";

const ModalWindow = ({ children, closeModal }) => {
    const overlayModalClickHandler = () => closeModal();
    const modalContentClickHandler = (e) => e.stopPropagation();

    return (
        <div
            className={classes.modal}
            onClick={overlayModalClickHandler}>
            <div onClick={modalContentClickHandler}>{children}</div>
        </div>
    );
};

export default ModalWindow;
