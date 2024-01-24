import React, { useState } from "react";
import classes from "./Filter.module.scss";

const Filter = ({ todosStatus, setTodosStatus }) => {
    function getActiveClassName(thisStatus) {
        if (thisStatus === todosStatus) return "activeBtn";
    }

    return (
        <>
            <h3>Фильтрация</h3>
            <button
                className={classes[getActiveClassName("active")]}
                onClick={() => setTodosStatus("active")}>
                Активные
            </button>

            <button
                className={classes[getActiveClassName("completed")]}
                onClick={() => setTodosStatus("completed")}>
                Выполненные
            </button>
            <button
                className={classes[getActiveClassName("all")]}
                onClick={() => setTodosStatus("all")}>
                Все
            </button>
        </>
    );
};

export default Filter;
