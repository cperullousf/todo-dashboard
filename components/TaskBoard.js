"use client";

import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

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
    // The current filter is stored in state because it changes
    // in response to user interaction and determines which tasks
    // are displayed.
    const [filter, setFilter] = useState("all");
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
    function clearCompleted() {

        // filter() returns only incomplete tasks, creating a
        // new array instead of modifying the existing one.
        setTasks(
            tasks.filter((task) => !task.completed)
        );  

    }
    // This value is derived from existing state rather than
    // stored separately. Keeping derived data out of state
    // avoids duplicate sources of truth.
    const filteredTasks = tasks.filter((task) => {

    if (filter === "active") {
        return !task.completed;
    }

    if (filter === "done") {
        return task.completed;
    }

    return true;

    });
    // These values are derived from the existing task array.
    // They update automatically whenever the task state changes.
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const activeTasks = totalTasks - completedTasks;
    return (
        <div className="bg-slate-800 text-white p-8 rounded-xl w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                My Task Dashboard
            </h1>
            <AddTaskForm onAddTask={addTask} />
            <TaskStats
                total={totalTasks}
                active={activeTasks}
                completed={completedTasks}
                onClearCompleted={clearCompleted}
            />
            <div className="flex justify-center gap-3 mb-6">

                <button
                    onClick={() => setFilter("all")}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("active")}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
                >
                    Active
                </button>

                <button
                    onClick={() => setFilter("done")}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
                >
                    Done
                </button>

            </div>
            <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
            />
        </div>
    );
}