import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from "@heroicons/react/solid";

import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    DELETE_CATEGORY_ITEM
} from "../../store/types";

import TodoCategoryItems from "./TodoCategoryItems";

const TodoCategory = (props) => {
    const [categoryText, setCategoryText] = useState("");
    const [categoryList, setCategoryList] = useState([]);

    const { categories } = useSelector((state) => state.category);
    const { items } = useSelector((state) => state.item);

    const dispatch = useDispatch();

    const addCategory = () => {
        if (!categoryText) {
            alert("Input category text!");
            return;
        }
        if (categoryList.includes(categoryText)) {
            alert("Category already exist!");
            return;
        }
        setCategoryList(prev => [...prev, categoryText]);
        setCategoryText("");

        dispatch({
            type: ADD_CATEGORY,
            payload: categoryText
        })
    }

    const deleteCategory = (deleteItem) => {
        if (items[deleteItem] && items[deleteItem].length > 0) {
            if (window.confirm("Do you want to delete all todo items?")) {
                removeCategory(deleteItem);
            }
        } else {
            removeCategory(deleteItem);
        }
    }

    const removeCategory = (deleteItem) => {
        delete items[deleteItem];

        dispatch({
            type: DELETE_CATEGORY_ITEM,
            payload: deleteItem
        })

        setCategoryList(prev => prev.filter(item => item !== deleteItem))

        dispatch({
            type: DELETE_CATEGORY,
            payload: deleteItem
        });

        props.onHandleDeleteAction();
    }

    const onChangeCategory = (e) => {
        if (e.keyCode === 13) addCategory();
    }

    useEffect(() => {
        setCategoryList(categories)
    }, [categories]);

    return (
        <>
            <div className="flex">
                <div className="flex-1">
                    <input
                        type="text"
                        className="shadow appearance-none border px-3 py-2 text-black text-base text-gray-700 leading-tight rounded outline-none w-full h-full"
                        placeholder="Input Category Text..."
                        value={categoryText}
                        onChange={(e) => setCategoryText(e.target.value)}
                        onKeyDown={onChangeCategory}
                    />
                </div>
                <button className="rounded bg-white hover:bg-gray-100 text-gray-800  p-3 ml-2 border border-gray-400 rounded shadow" onClick={addCategory}>
                    <PlusIcon className="w-4 h-4" />
                </button>
            </div>

            {categoryList.length > 0 &&
                <TodoCategoryItems
                    list={categoryList}
                    onHandleDeleteCategory={deleteCategory}
                    onHandleSelectCategory={(item) => props.onHandleSelectCategory(item)}
                />
            }
        </>
    );
}

export default TodoCategory;
