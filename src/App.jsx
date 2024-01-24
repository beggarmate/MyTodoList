import { useEffect, useState } from "react";
import Search from "./Components/Search/Search";
import TodosPlace from "./Components/TodosPlace/TodosPlace";
import AddTodo from "./Components/TodosPlace/AddTodo/AddTodo";
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
        searchProperties: { title: true, body: true, date: true },
        sort: "title",
        sortIncreaseOrder: false,
    });

    const searchAndSortedTodos = useTodos(todos, filter);

    return (
        <div
            inert={openModal ? "true" : null}
            className="App">
            <Search
                filter={filter}
                setFilter={setFilter}
            />
            <TodosPlace
                todos={searchAndSortedTodos}
                filter={filter}
                setFilter={setFilter}
                setTodos={setTodos}
                setOpenModal={setOpenModal}
            />
        </div>
    );
}

export default App;
