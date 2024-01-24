import React, { useState } from "react";
import classes from "./Todo.module.scss";
import editIcon from "../../../icons/editIcon.svg";
import deleteIcon from "../../../icons/deleteIcon.svg";
import completeIcon from "../../../icons/completeIcon.svg";
import backActiveIcon from "../../../icons/backActiveIcon.png";
import { createPortal } from "react-dom";
import ModalWindow from "../../ModalWindow/ModalWindow";
import TodoPage from "./TodoCard/TodoCard";
import getLocaleDate from "./../../../utils/getLocaleDate";
import { motion } from "framer-motion";

const Todo = ({
    todo,
    removeTodo,
    openEditWindow,
    setOpenModal,
    filter,
    toggleTodoStatusClickHandler,
}) => {
    const [showTodoCard, setShowTodoCard] = useState(false);

    function openTodoCard() {
        setOpenModal(true);
        setShowTodoCard(true);
    }

    function closeTodoCard() {
        setOpenModal(false);
        setShowTodoCard(false);
    }

    const titleClickHandler = () => openTodoCard(todo);

    const highlightText = (text, substr, property) => {
        const parts = text.split(new RegExp(`(${substr})`, "gi"));
        return parts.map((part, index) =>
            filter.searchProperties[property] &&
            part.toLowerCase() === substr.toLowerCase() ? (
                <mark key={index}>{part}</mark>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    const title = highlightText(todo.title, filter.searchQuery, "title");
    const body = highlightText(todo.body, filter.searchQuery, "body");
    const date = highlightText(
        getLocaleDate(new Date(...todo.date.split(" "))),
        filter.searchQuery,
        "date"
    );

    const todoCard =
        showTodoCard &&
        createPortal(
            <ModalWindow closeModal={closeTodoCard}>
                <TodoPage todo={todo} />
            </ModalWindow>,
            document.body
        );

    return (
        <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={classes.todo + " " + classes[todo.status]}>
            <p
                className={classes.title}
                onClick={titleClickHandler}>
                {title}
            </p>
            <p className={classes.body}>{body}</p>
            <p className={classes.date}>{date}</p>
            <div className={classes.btns}>
                {openEditWindow ? (
                    <button
                        className={classes.editBtn}
                        onClick={() => openEditWindow(todo.id)}>
                        <img
                            src={editIcon}
                            alt="edit icon"
                        />
                    </button>
                ) : null}
                <button
                    className={
                        todo.status === "active"
                            ? classes.activeBtn
                            : classes.completedBtn
                    }
                    onClick={() => {
                        toggleTodoStatusClickHandler(todo.id);
                    }}>
                    <img
                        src={
                            todo.status === "active"
                                ? completeIcon
                                : backActiveIcon
                        }
                        alt={
                            todo.status === "active"
                                ? "active icon"
                                : "complete icon"
                        }
                    />
                </button>
                <button
                    className={classes.removeBtn}
                    onClick={() => removeTodo(todo.id)}>
                    <img
                        src={deleteIcon}
                        alt="delete icon"
                    />
                </button>
            </div>
            {todoCard}
        </motion.div>
    );
};

export default Todo;
