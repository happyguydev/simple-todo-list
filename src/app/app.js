import { useRef } from "react";
import { BrowserRouter, useHistory } from 'react-router-dom';

import TodoCategory from "./components/TodoCategory";
import TodoList from "./components/TodoList";

const App = () => {
    const history = useHistory();

    const todoListRef = useRef();

    const selectCategory = (item) => {
        todoListRef.current.getCategory(item);
    }

    const deleteAction = () => {
        todoListRef.current.categoryDeleteAction();
    }

    return (
        <BrowserRouter history={history}>
            <h1 className="my-5 text-center text-5xl font-bold text-indigo-700">Todo List Web Application</h1>
            <div className="flex flex-col sm:flex-row max-w-6xl mx-auto">
                <div className="px-4 pt-20 w-full sm:w-96">
                    <TodoCategory onHandleSelectCategory={selectCategory} onHandleDeleteAction={deleteAction} />
                </div>
                <div className="flex-auto px-4 py-8">
                    <TodoList ref={todoListRef} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
