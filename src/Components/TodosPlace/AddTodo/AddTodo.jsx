import React, { useState } from "react";
import { getId } from "../../../utils/getId";
import classes from "./AddTodo.module.scss";
import { createPortal } from "react-dom";
import ModalWindow from "../../ModalWindow/ModalWindow";
const emptyNewTodo = { title: "", body: "" };

const AddTodo = ({ todos, setTodos, setOpenModal }) => {
    const [newTodo, setNewTodo] = useState(emptyNewTodo);
    const [hasOpenAddTodoModal, setHasOpenAddTodoModal] = useState(false);

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
        closeAddTodoModal();
    };

    const modal =
        hasOpenAddTodoModal &&
        createPortal(
            <ModalWindow closeModal={closeAddTodoModal}>
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
            </ModalWindow>,
            document.body
        );

    function openAddTodoModal() {
        setOpenModal(true);
        setHasOpenAddTodoModal(true);
    }

    function closeAddTodoModal() {
        setOpenModal(false);
        setHasOpenAddTodoModal(false);
    }

    return (
        <>
            <h3>Создать задачу</h3>
            <button
                className={classes.addBtn}
                onClick={openAddTodoModal}>
                <span className={classes.addBtnPlus}>+</span>
            </button>
            {modal}
        </>
    );
};

export default AddTodo;
