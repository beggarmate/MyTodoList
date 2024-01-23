import React from "react";

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

    return (
        <div className="search">
            <input
                placeholder="Поиск..."
                type="text"
                value={filter.searchQuery}
                onChange={searchQueryChangeHandler}
            />
            <div>
                <h3>Искать в</h3>
                <label>
                    <span>Названии</span>
                    <input
                        checked={filter.searchProperties.title}
                        onChange={searchPropertiesChangeHandler("title")}
                        type="checkbox"
                        name="title"
                    />
                </label>
                <label>
                    <span>Содержании</span>
                    <input
                        checked={filter.searchProperties.body}
                        onChange={searchPropertiesChangeHandler("body")}
                        type="checkbox"
                        name="body"
                    />
                </label>
                <label>
                    <span>Дате</span>
                    <input
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
