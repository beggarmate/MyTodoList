import React, { useState } from "react";
import { getId } from "../../utils/getId";
import classes from "./AddTodo.module.scss";

const emptyNewTodo = { title: "", body: "" };

const AddTodo = ({ todos, setTodos, openModal }) => {
    const [newTodo, setNewTodo] = useState(emptyNewTodo);

    const titleChangeHandler = (e) => {
        setNewTodo({ ...newTodo, title: e.target.value });
    };

    const bodyChangeHandler = (e) =>
        setNewTodo({ ...newTodo, body: e.target.value });

    const addTodoFormSubmitHandler = (e) => {
        e.preventDefault();

        if (!newTodo.title.trim() || !newTodo.body.trim()) return;

        const currentDate = new Date();
        const date = `${currentDate.getFullYear()} ${currentDate.getMonth()} ${currentDate.getDate()} ${currentDate.getHours()} ${currentDate.getMinutes()}`;

        setTodos([
            ...todos,
            {
                ...newTodo,
                id: getId(),
                date,
                status: "active",
            },
        ]);

        setNewTodo(emptyNewTodo);
    };

    return (
        <form
            onSubmit={addTodoFormSubmitHandler}
            className={classes.addTodoForm}>
            <input
                placeholder="Название задачи..."
                type="text"
                value={newTodo.title}
                onChange={titleChangeHandler}
            />
            <input
                placeholder="Содержимое..."
                type="text"
                value={newTodo.body}
                onChange={bodyChangeHandler}
            />
            <button>Добавить</button>
        </form>
    );
};

export default AddTodo;
