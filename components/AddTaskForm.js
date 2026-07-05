"use client";

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
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Enter a task..."
                className="w-full rounded-lg p-3 text-black"
            />
        </div>
    );
}