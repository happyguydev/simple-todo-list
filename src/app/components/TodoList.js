import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/solid";

import TodoListItems from "./TodoListItems";
import { ADD_ITEM, DELETE_ITEM } from "../../store/types";

const TodoList = forwardRef((props, ref) => {
    const [todoItemText, setTodoItemText] = useState("");
    const [todoItems, setTodoItems] = useState([]);
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.item);

    useImperativeHandle(ref, () => ({
        getCategory(category) {
            setCategory(category);
            setTodoItemText("");

            (items[category] && items[category].length > 0) ? setTodoItems(items[category]) : setTodoItems([]);
        },
        categoryDeleteAction() {
            setCategory("");
            setTodoItems([]);
        }
    }));

    const addTodoItem = () => {
        if (!todoItemText) {
            alert("Input item text!");
            return;
        }
        if (!category) {
            alert("Please select category!");
            return;
        }
        if (todoItems.includes(todoItemText)) {
            alert("Todo item already exist!");
            return;
        }
        setTodoItems(prev => [...prev, todoItemText]);
        setTodoItemText("");

        let todoItemList;

        (category in items) ? todoItemList = [...items[category], todoItemText] : todoItemList = [todoItemText];

        const payload = {
            category: category,
            items: todoItemList
        }

        dispatch({
            type: ADD_ITEM,
            payload: payload
        })
    }

    const onHandleDeleteTodoItem = (deleteItem) => {
        setTodoItems(prev => prev.filter(item => item !== deleteItem));

        const payload = {
            category: category,
            deleteItem: deleteItem
        }

        dispatch({
            type: DELETE_ITEM,
            payload: payload
        })
    }

    const onChangeItem = (e) => {
        if (e.keyCode === 13) addTodoItem();
    }

    return (
        <>
            {category &&
                <>
                    <h2 className="mb-4 text-center text-2xl font-bold text-indigo-700">"{category}" Todo list</h2>
                    <div className="flex w-full sm:max-w-md mx-auto">
                        <div className="flex-1">
                            <input
                                type="text"
                                className="shadow appearance-none border px-3 py-2 text-black text-base text-gray-700 leading-tight rounded outline-none w-full h-full"
                                placeholder="Input Item Text..."
                                value={todoItemText}
                                onChange={(e) => setTodoItemText(e.target.value)}
                                onKeyDown={onChangeItem}
                            />
                        </div>
                        <button className="p-3 rounded text-white bg-gray-600 ml-2" onClick={addTodoItem}>
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {todoItems.length > 0 ?
                        <TodoListItems list={todoItems} onHandleDeleteTodoItem={onHandleDeleteTodoItem} />
                        :
                        <h2 className="mt-4 text-center text-base font-bold text-gray-600">No Todo Items</h2>
                    }
                </>
            }
        </>
    );
});

export default TodoList;
