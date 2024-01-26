import React, { useState } from "react";
import classes from "./Sort.module.scss";

const Sort = ({ filter, setFilter }) => {
    const sortChangeHandler = (e) => {
        setFilter({
            ...filter,
            sort: e.target.value,
            sortIncreaseOrder: true,
        });
    };
    const toggleSortOrderClickHandler = () => {
        setFilter({
            ...filter,
            sortIncreaseOrder: !filter.sortIncreaseOrder,
        });
    };

    const getClassName = (sort) => {
        return filter.sort === sort
            ? `${classes.sortRadioInp} ${classes.sortActive}`
            : classes.sortRadioInp;
    };

    const getSortOrder = (sortTitle) => {
        if (sortTitle === filter.sort && filter.sortIncreaseOrder) {
            return "increase";
        }

        if (sortTitle === filter.sort && !filter.sortIncreaseOrder) {
            return "decrease";
        }
    };

    function getSortOrderText(property) {
        if (getSortOrder(property) === "increase")
            return (
                <span>
                    ({property === "date" ? "Сначала старые" : "от А до Я"})
                </span>
            );
        if (getSortOrder(property) === "decrease")
            return (
                <span>
                    ({property === "date" ? "Сначала свежие" : "от Я до А"})
                </span>
            );
        return null;
    }

    return (
        <>
            <h3>Сортировка </h3>
            <label
                className={getClassName("title")}
                tabIndex="0">
                <span>
                    По названию
                    <br />
                    {getSortOrderText("title")}
                </span>
                <input
                    hidden
                    type="radio"
                    name="sort"
                    value="title"
                    checked={filter.sort === "title"}
                    onChange={sortChangeHandler}
                    onClick={toggleSortOrderClickHandler}
                />
            </label>
            <label
                className={getClassName("body")}
                tabIndex="0">
                <span>
                    По содержанию
                    <br />
                    {getSortOrderText("body")}
                </span>
                <input
                    hidden
                    type="radio"
                    name="sort"
                    value="body"
                    checked={filter.sort === "body"}
                    onChange={sortChangeHandler}
                    onClick={toggleSortOrderClickHandler}
                />
            </label>
            <label
                className={getClassName("date")}
                tabIndex="0">
                <span>
                    По дате создания
                    <br />
                    {getSortOrderText("date")}
                </span>
                <input
                    hidden
                    type="radio"
                    name="sort"
                    value="date"
                    checked={filter.sort === "date"}
                    onChange={sortChangeHandler}
                    onClick={toggleSortOrderClickHandler}
                />
            </label>
        </>
    );
};

export default Sort;
