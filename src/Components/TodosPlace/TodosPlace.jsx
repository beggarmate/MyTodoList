import React, { useState } from "react";
import Todo from "../Todo/Todo";
import EditTodoForm from "../EditTodoForm/EditTodoForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { createPortal } from "react-dom";
import classes from "./TodosPlace.module.scss";

const TodosPlace = ({ todos, setTodos, filter, setOpenModal }) => {
    const [todosStatus, setTodosStatus] = useState("all");
    const [hasEditModal, setHasEditModal] = useState(false);
    const [editTodoId, setEditTodoId] = useState();

    const modal =
        hasEditModal &&
        createPortal(
            <ModalWindow closeEditWindow={closeEditWindow}>
                <EditTodoForm
                    todo={todos.find((todo) => todo.id === editTodoId)}
                    editTodo={editTodo}
                    editTodoId={editTodoId}
                    setHasEditModal={setHasEditModal}
                    setOpenModal={setOpenModal}
                />
            </ModalWindow>,
            document.body
        );

    function openEditWindow(id) {
        setHasEditModal(!hasEditModal);
        setEditTodoId(id);
        setOpenModal(true);
    }

    function closeEditWindow() {
        setHasEditModal(false);
        setOpenModal(false);
    }

    function editTodo(id, newTitle, newBody) {
        setTodos(
            todos.map((todo) => {
                return todo.id !== id
                    ? todo
                    : {
                          ...todo,
                          title: newTitle,
                          body: newBody,
                      };
            })
        );
    }

    const toggleTodoStatusClickHandler = (id) => {
        setTodos(
            todos.map((todo) => {
                return todo.id !== id
                    ? todo
                    : {
                          ...todo,
                          status:
                              todo.status === "active" ? "completed" : "active",
                      };
            })
        );
    };

    function getTodos(todos) {
        return todos.map((todo, index) => (
            <Todo
                todosStatus={todosStatus}
                toggleTodoStatusClickHandler={toggleTodoStatusClickHandler}
                filter={filter}
                openEditWindow={openEditWindow}
                removeTodo={removeTodo}
                todo={todo}
                key={todo.id}
                index={index}
            />
        ));
    }

    const emptyTodosContent = (
        <div className={classes.emptyTodosContent}>
            Список задач пуст! Создайте новые задачи или измените параметры
            поиска!
        </div>
    );

    const allTodos = todos[0] ? getTodos(todos) : [];

    const statusTodos = todos[0]
        ? getTodos(todos.filter((todo) => todo.status === todosStatus))
        : [];

    function removeTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div className={classes.todosPlace}>
            <div className={classes.todosPlaceButtons}>
                <button
                    className={todosStatus === "active" ? classes.active : null}
                    onClick={() => setTodosStatus("active")}>
                    Активные
                </button>

                <button
                    className={
                        todosStatus === "completed" ? classes.completed : null
                    }
                    onClick={() => setTodosStatus("completed")}>
                    Выполненные
                </button>
                <button
                    className={todosStatus === "all" ? classes.all : null}
                    onClick={() => setTodosStatus("all")}>
                    Все
                </button>
            </div>
            <div className={classes.todosPlaceContent}>
                {todosStatus === "all" && allTodos[0]
                    ? allTodos
                    : statusTodos[0]
                    ? statusTodos
                    : emptyTodosContent}
                {modal}
            </div>
        </div>
    );
};

export default TodosPlace;
