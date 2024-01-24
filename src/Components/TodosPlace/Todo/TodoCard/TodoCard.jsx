import React, { useState } from "react";
import classes from "./TodoCard.module.scss";

const TodoCard = ({ todo }) => {
    return (
        <div className={classes.todoCard}>
            <h2>{todo.title}</h2>
            <p>{todo.body}</p>
        </div>
    );
};

export default TodoCard;
