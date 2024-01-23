import React, { useState } from "react";
import classes from "./Sort.module.scss";

const Sort = ({ filter, setFilter }) => {
    const sortChangeHandler = (e) =>
        setFilter({ ...filter, sort: e.target.value });

    const getClassName = (sort) => {
        return filter.sort === sort
            ? `${classes.sort} ${classes.sortActive}`
            : classes.sort;
    };

    return (
        <div className="sort">
            <h3>Сортировка</h3>
            <label
                className={getClassName("title")}
                tabIndex="0">
                <span>По названию</span>
                <input
                    type="radio"
                    name="sort"
                    value="title"
                    checked={filter.sort === "title"}
                    onChange={sortChangeHandler}
                />
            </label>
            <label
                className={getClassName("body")}
                tabIndex="0">
                <span>По содержанию</span>
                <input
                    type="radio"
                    name="sort"
                    value="body"
                    checked={filter.sort === "body"}
                    onChange={sortChangeHandler}
                />
            </label>
            <label
                className={getClassName("date")}
                tabIndex="0">
                <span>По дате</span>
                <input
                    type="radio"
                    name="sort"
                    value="date"
                    checked={filter.sort === "date"}
                    onChange={sortChangeHandler}
                />
            </label>
        </div>
    );
};

export default Sort;
