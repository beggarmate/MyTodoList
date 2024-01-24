import React, { useState } from "react";

import EditTodoForm from "./Todo/EditTodoForm/EditTodoForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { createPortal } from "react-dom";
import classes from "./TodosPlace.module.scss";
import Sort from "./Sort/Sort";
import Todo from "./Todo/Todo";
import AddTodo from "./AddTodo/AddTodo";
import Filter from "./Filter/Filter";
import { AnimatePresence } from "framer-motion";

const TodosPlace = ({ todos, setTodos, filter, setFilter, setOpenModal }) => {
    const [todosStatus, setTodosStatus] = useState("active");
    const [hasEditModal, setHasEditModal] = useState(false);
    const [editTodoId, setEditTodoId] = useState();

    const modal =
        hasEditModal &&
        createPortal(
            <ModalWindow closeModal={closeModal}>
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

    function closeModal() {
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
                setOpenModal={setOpenModal}
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
                <AddTodo
                    todos={todos}
                    setTodos={setTodos}
                    setOpenModal={setOpenModal}
                />
                <Filter
                    todosStatus={todosStatus}
                    setTodosStatus={setTodosStatus}
                />
                <Sort
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
            <div className={classes.todosPlaceContent}>
                <AnimatePresence>
                    {todosStatus === "all" && allTodos[0]
                        ? allTodos
                        : statusTodos[0]
                        ? statusTodos
                        : emptyTodosContent}
                </AnimatePresence>
            </div>
            {modal}
        </div>
    );
};

export default TodosPlace;
