import React, { useState } from "react";

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
        <form onSubmit={submitHandler}>
            <label>
                <h3>Название</h3>
                <input
                    type="text"
                    value={newTitle}
                    onChange={newTitleChangeHandler}
                />
            </label>

            <label>
                <h3>Содержание</h3>
                <input
                    type="text"
                    value={newBody}
                    onChange={newBodyChangeHandler}
                />
            </label>
            <button>Сохранить</button>
        </form>
    );
};

export default EditTodoForm;
