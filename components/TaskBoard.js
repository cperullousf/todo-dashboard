"use client";

import { useEffect, useState } from "react";
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
    // Tasks start as an empty array so the initial server render
    // matches the first client render. Saved tasks are loaded after
    // the component mounts.
    const [tasks, setTasks] = useState([]);
    // The current filter is stored in state because it changes
    // in response to user interaction and determines which tasks
    // are displayed.
    const [filter, setFilter] = useState("all");

    // Read any previously saved tasks after the component mounts.
    // localStorage is only available in the browser, so this work
    // is performed inside useEffect rather than during rendering.
    useEffect(() => {

        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }

    }, []);
    // Synchronize the current task state with localStorage so the
    // user's tasks persist after a browser refresh. The dependency
    // array contains only 'tasks' because that is the only value
    // being written to storage.
    useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);
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
            <div className="bg-slate-700 rounded-lg p-4 mb-6 flex justify-center gap-3">

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