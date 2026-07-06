/*
==========================================================
Component: TaskStats
Purpose: Displays task counts and provides a button to
clear all completed tasks.

Component Type: Server Component

Props:
total - Total number of tasks.
active - Number of incomplete tasks.
completed - Number of completed tasks.
onClearCompleted - Callback from TaskBoard.
==========================================================
*/

export default function TaskStats({
    total,
    active,
    completed,
    onClearCompleted,
}) {

    return (

        <div className="bg-slate-700 rounded-lg p-4 mb-6 flex justify-between items-center">

            <div className="flex gap-6">

                <span>Total: {total}</span>

                <span>Active: {active}</span>

                <span>Done: {completed}</span>

            </div>

            {completed > 0 && (

                <button
                    onClick={onClearCompleted}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                >
                    Clear Completed
                </button>

            )}

        </div>

    );

}