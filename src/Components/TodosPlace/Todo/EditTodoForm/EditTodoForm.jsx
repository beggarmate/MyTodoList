import React, { useState } from "react";
import classes from "./EditTodoForm.module.scss";

const EditTodoForm = ({
    todo,
    editTodo,
    editTodoId,
    setHasEditModal,
    setOpenModal,
}) => {
    const [newTitle, setNewTitle] = useState(todo.title.trim());
    const [newBody, setNewBody] = useState(todo.body.trim());

    const submitHandler = (e) => {
        e.preventDefault();
        editTodo(editTodoId, newTitle, newBody);
        setHasEditModal(false);
        setOpenModal(false);
    };

    const newTitleChangeHandler = (e) => setNewTitle(e.target.value);
    const newBodyChangeHandler = (e) => setNewBody(e.target.value);

    return (
        <form
            className={classes.editTodoForm}
            onSubmit={submitHandler}>
            <h3>Название</h3>
            <input
                type="text"
                placeholder="Введите новое название..."
                value={newTitle}
                onChange={newTitleChangeHandler}
            />
            <h3>Содержание</h3>
            <input
                type="text"
                placeholder="Введите текст..."
                value={newBody}
                onChange={newBodyChangeHandler}
            />
            <button>Сохранить</button>
        </form>
    );
};

export default EditTodoForm;
