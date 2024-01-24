import { useCallback, useMemo } from "react";
import hasSubstr from "../utils/hasSubstr";

export default function useTodos(todos, filter) {
    const getSortedTodos = useCallback(() => {
        return [...todos].sort((a, b) =>
            filter.sortIncreaseOrder
                ? a[filter.sort].localeCompare(b[filter.sort])
                : b[filter.sort].localeCompare(a[filter.sort])
        );
    }, [todos, filter]);

    const searchAndSortedTodos = useMemo(() => {
        if (filter.searchQuery.trim() === "") return getSortedTodos();
        return getSortedTodos().filter((todo) => {
            for (const key in todo) {
                if (key === "id" || !filter.searchProperties[key]) continue;

                if (hasSubstr(todo[key], filter.searchQuery)) {
                    return true;
                }
            }

            return false;
        });
    }, [filter, getSortedTodos]);

    return searchAndSortedTodos;
}
