import React, { useState } from "react";
import classes from "./Sort.module.scss";

const Sort = ({ filter, setFilter }) => {
    const sortChangeHandler = (e) => {
        setFilter({
            ...filter,
            sort: e.target.value,
            sortIncreaseOrder: false,
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

    const whichArrow = (sortTitle) => {
        if (sortTitle === filter.sort && filter.sortIncreaseOrder) {
            return "upArrow";
        }

        if (sortTitle === filter.sort && !filter.sortIncreaseOrder) {
            return "downArrow";
        }
    };

    return (
        <>
            <h3>Сортировка </h3>
            <label
                className={getClassName("title")}
                tabIndex="0">
                <span>
                    По названию <br></br>
                    {whichArrow("title") === "upArrow" ? (
                        <span>&#129045;</span>
                    ) : whichArrow("title") === "downArrow" ? (
                        <span>&#129047;</span>
                    ) : null}
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
                    <br></br>
                    {whichArrow("body") === "upArrow" ? (
                        <span>&#129045;</span>
                    ) : whichArrow("body") === "downArrow" ? (
                        <span>&#129047;</span>
                    ) : null}
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
                    По дате <br></br>
                    {whichArrow("date") === "upArrow" ? (
                        <span>&#129045;</span>
                    ) : whichArrow("date") === "downArrow" ? (
                        <span>&#129047;</span>
                    ) : null}
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
