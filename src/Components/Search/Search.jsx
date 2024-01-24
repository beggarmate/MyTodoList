import React from "react";
import classes from "./Search.module.scss";

const Search = ({ filter, setFilter }) => {
    const searchQueryChangeHandler = (e) =>
        setFilter({ ...filter, searchQuery: e.target.value });

    const searchPropertiesChangeHandler = (propertyName) => () =>
        setFilter({
            ...filter,
            searchProperties: {
                ...filter.searchProperties,
                [propertyName]: !filter.searchProperties[propertyName],
            },
        });

    function getSearchCheckboxLabelClassName(searchProperty) {
        if (filter.searchProperties[searchProperty]) {
            return `${classes.activeSearchLabel} ${classes.searchLabel}`;
        } else {
            return classes.searchLabel;
        }
    }

    return (
        <div className={classes.search}>
            <input
                className={classes.searchInput}
                placeholder="Поиск..."
                type="text"
                value={filter.searchQuery}
                onChange={searchQueryChangeHandler}
            />
            <h3>Искать в</h3>
            <div className={classes.searchCheckboxInputs}>
                <label className={getSearchCheckboxLabelClassName("title")}>
                    <span>Названии</span>
                    <input
                        hidden
                        checked={filter.searchProperties.title}
                        onChange={searchPropertiesChangeHandler("title")}
                        type="checkbox"
                        name="title"
                    />
                </label>
                <label className={getSearchCheckboxLabelClassName("body")}>
                    <span>Содержании</span>
                    <input
                        hidden
                        checked={filter.searchProperties.body}
                        onChange={searchPropertiesChangeHandler("body")}
                        type="checkbox"
                        name="body"
                    />
                </label>
                <label className={getSearchCheckboxLabelClassName("date")}>
                    <span>Дате</span>
                    <input
                        hidden
                        checked={filter.searchProperties.date}
                        onChange={searchPropertiesChangeHandler("date")}
                        type="checkbox"
                        name="date"
                    />
                </label>
            </div>
        </div>
    );
};

export default Search;
