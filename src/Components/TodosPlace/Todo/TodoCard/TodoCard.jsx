import React, { useState } from "react";
import classes from "./TodoCard.module.scss";

const TodoCard = ({
    todo,
    deleteClickHandler,
    editClickHandler,
    toggleTodoStatusClickHandler,
}) => {
    return (
        <div className={classes.todoCard}>
            <h2 className={classes.title}>
                <span>{todo.title}</span>
            </h2>
            <p className={classes.body}>
                <span>{todo.body}</span>
            </p>
            <div className={classes.btns}>
                <button
                    onClick={() => toggleTodoStatusClickHandler(todo.id)}
                    className={classes.editBtn}>
                    {todo.status === "active"
                        ? "Отметить как выполненную"
                        : "Вернуть в активные"}
                </button>
                <button
                    onClick={() => editClickHandler(todo.id)}
                    className={classes.editBtn}>
                    Редактировать
                </button>
                <button
                    onClick={deleteClickHandler}
                    className={classes.removeBtn}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default TodoCard;
