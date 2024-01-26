import React, { useState } from "react";
import classes from "./TodoCard.module.scss";

const TodoCard = ({ todo }) => {
    return (
        <div className={classes.todoCard}>
            <h2 className={classes.title}>{todo.title}</h2>
            <p className={classes.body}>{todo.body}</p>
        </div>
    );
};

export default TodoCard;
