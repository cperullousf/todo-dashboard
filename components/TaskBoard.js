"use client";

import AddTaskForm from "./AddTaskForm";

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
    return (
        <div className="bg-slate-800 text-white p-8 rounded-xl w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                My Task Dashboard
            </h1>
            <AddTaskForm />
        </div>
    );
}