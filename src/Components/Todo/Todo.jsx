import React, { useState } from "react";
import getLocaleDate from "../../utils/getLocaleDate";
import classes from "./Todo.module.scss";
import editIcon from "../../icons/editIcon.png";
import deleteIcon from "../../icons/deleteIcon.png";
import completeIcon from "../../icons/completeIcon.png";
import backActiveIcon from "../../icons/backActiveIcon.png";

const Todo = ({
    todo,
    removeTodo,
    openEditWindow,
    filter,
    index,
    toggleTodoStatusClickHandler,
}) => {
    const [showTodoCard, setShowTodoCard] = useState(false);

    function openTodoCard(todo) {
        showTodoCard(true);
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

    return (
        <div className={classes.todo + " " + classes[todo.status]}>
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
                            : classes.completeBtn
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
        </div>
    );
};

export default Todo;
