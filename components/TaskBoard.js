"use client";

import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

/*
==========================================================
Component: TaskBoard
Purpose: Manages the application's task data and passes it
to child components.
Component Type: Client Component

This component owns all application state because multiple
child components need access to the same task data.
==========================================================
*/

export default function TaskBoard() {
    // The task list is stored in state because it changes over time
    // and multiple child components depend on it.
    const [tasks, setTasks] = useState([]);
    function addTask(taskText) {

    // Ignore blank or whitespace-only submissions.
    if (taskText.trim() === "") {
        return;
    }

    // Create a new array instead of modifying the existing one.
    // React detects the new array reference and re-renders.
    setTasks([
        ...tasks,
        {
            id: Date.now(),
            text: taskText,
            completed: false,
        },
    ]);
}
    function toggleTask(id) {

    // map() creates a new array instead of modifying the
    // existing one. Immutable updates allow React to detect
    // the state change and re-render.
    setTasks(
        tasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    );

}
    function deleteTask(id) {

    // filter() creates a new array that excludes the task
    // being removed. This avoids mutating the original state.
    setTasks(
        tasks.filter((task) => task.id !== id)
    );

}
    return (
        <div className="bg-slate-800 text-white p-8 rounded-xl w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                My Task Dashboard
            </h1>
            <AddTaskForm onAddTask={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
            />
        </div>
    );
}