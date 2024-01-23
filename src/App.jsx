import { useEffect, useState } from "react";
import Search from "./Components/Search/Search";
import Sort from "./Components/Sort/Sort";
import TodosPlace from "./Components/TodosPlace/TodosPlace";
import AddTodo from "./Components/AddTodo/AddTodo";
import useTodos from "./Hooks/useTodos";
import "./App.scss";

function App() {
    const [openModal, setOpenModal] = useState(false);
    const [todos, setTodos] = useState(
        localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos"))
            : []
    );

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const [filter, setFilter] = useState({
        searchQuery: "",
        searchProperties: { title: true, body: false, date: false },
        sort: "title",
    });

    const searchAndSortedTodos = useTodos(todos, filter);

    return (
        <div
            inert={openModal ? "true" : null}
            className="App">
            <AddTodo
                todos={todos}
                setTodos={setTodos}
            />
            <Search
                filter={filter}
                setFilter={setFilter}
            />
            <Sort
                filter={filter}
                setFilter={setFilter}
            />
            <TodosPlace
                todos={searchAndSortedTodos}
                filter={filter}
                setTodos={setTodos}
                setOpenModal={setOpenModal}
            />
        </div>
    );
}

export default App;
