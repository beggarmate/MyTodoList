import React, { useState } from "react";
import classes from "./Todo.module.scss";
import editIcon from "../../../image/icons/editIcon.svg";
import deleteIcon from "../../../image/icons/deleteIcon.svg";
import completeIcon from "../../../image/icons/completeIcon.svg";
import backActiveIcon from "../../../image/icons/backActiveIcon.png";
import { createPortal } from "react-dom";
import ModalWindow from "../../ModalWindow/ModalWindow";
import TodoPage from "./TodoCard/TodoCard";
import getLocaleDate from "./../../../utils/getLocaleDate";
import { motion } from "framer-motion";
import ToolTip from "../../ToolTip/ToolTip";

const Todo = ({
    todo,
    removeTodo,
    openEditWindow,
    setOpenModal,
    filter,
    toggleTodoStatusClickHandler,
}) => {
    const [showTodoCard, setShowTodoCard] = useState(false);
    const [showRemoveWarning, setShowRemoveWarning] = useState(false);

    function openTodoCard() {
        setOpenModal(true);
        setShowTodoCard(true);
    }

    function closeTodoCard() {
        setOpenModal(false);
        setShowTodoCard(false);
    }

    function openRemoveTodoModal() {
        setOpenModal(true);
        setShowRemoveWarning(true);
    }

    function closeRemoveTodoModal() {
        setOpenModal(false);
        setShowRemoveWarning(false);
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

    const completeDate = todo.completeDate
        ? highlightText(
              getLocaleDate(new Date(...todo.completeDate.split(" "))),
              filter.searchQuery,
              "date"
          )
        : null;

    const removeModal =
        showRemoveWarning &&
        createPortal(
            <ModalWindow closeModal={closeRemoveTodoModal}>
                <div className={classes.deleteWarningMessage}>
                    <h2>Вы уверены, что хотите удалить задачу?</h2>
                    <div className={classes.deleteWarningBtns}>
                        <button
                            className={classes.acceptRemoveBtn}
                            onClick={() => {
                                removeTodo(todo.id);
                                closeRemoveTodoModal();
                            }}>
                            Да
                        </button>
                        <button
                            className={classes.cancelRemoveBtn}
                            onClick={closeRemoveTodoModal}>
                            Отмена
                        </button>
                    </div>
                </div>
            </ModalWindow>,
            document.body
        );

    const todoCard =
        showTodoCard &&
        createPortal(
            <ModalWindow closeModal={closeTodoCard}>
                <TodoPage
                    todo={todo}
                    deleteClickHandler={openRemoveTodoModal}
                    editClickHandler={openEditWindow}
                    toggleTodoStatusClickHandler={toggleTodoStatusClickHandler}
                />
            </ModalWindow>,
            document.body
        );

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 500 }}
            transition={{ duration: 0.4 }}
            className={classes.todo + " " + classes[todo.status]}>
            <p
                className={classes.title}
                onClick={titleClickHandler}>
                {title}
            </p>
            <p className={classes.body}>{body}</p>
            <div className={classes.date}>
                <ToolTip text={"Дата создания задачи"}>
                    <p className={classes.dateStart}>{date}</p>
                </ToolTip>
                {todo.completeDate ? (
                    <ToolTip text={"Дата выполнения задачи"}>
                        <p className={classes.completeDate}>{completeDate}</p>
                    </ToolTip>
                ) : null}
            </div>
            <div className={classes.btns}>
                <ToolTip text={"Редактировать"}>
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
                </ToolTip>
                <ToolTip
                    text={
                        todo.status === "active"
                            ? "Задача выполнена"
                            : "Вернуть в активные"
                    }>
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
                </ToolTip>
                <ToolTip text={"Удалить задачу"}>
                    <button
                        className={classes.removeBtn}
                        onClick={openRemoveTodoModal}>
                        <img
                            src={deleteIcon}
                            alt="delete icon"
                        />
                    </button>
                </ToolTip>
            </div>
            {todoCard}
            {removeModal}
        </motion.div>
    );
};

export default Todo;
