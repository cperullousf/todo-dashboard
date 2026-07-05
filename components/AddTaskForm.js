"use client";

import { useState } from "react";

/*
==========================================================
Component: AddTaskForm
Purpose: Displays the form used to add new tasks.

Component Type: Client Component

Props:
onAddTask - Callback function provided by TaskBoard that
adds a new task to the application's state.
==========================================================
*/

export default function AddTaskForm({ onAddTask }) {
    // The input value is stored in state so React becomes the
    // single source of truth for the textbox.
    const [taskText, setTaskText] = useState("");
    function handleSubmit(event) {

    // Prevent the browser from refreshing the page when the
    // form is submitted so React can handle the submission.
    event.preventDefault();

    onAddTask(taskText);

    setTaskText("");
}
    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-3 mb-6"
>
            <input
                type="text"
                placeholder="Enter a task..."
                 value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                className="flex-1 rounded-lg p-3 text-black"
            />

            <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 px-5 rounded-lg"
            >
                Add
            </button>
        </form>
    );
}