/*
==========================================================
Component: TaskCard
Purpose: Displays one individual task.

Component Type: Server Component

Props:
task - The task object to display.
onToggle - Callback that toggles completion.
onDelete - Callback that removes the task.
==========================================================
*/

export default function TaskCard({ task, onToggle, onDelete }) {

    return (
        <div className="bg-slate-700 rounded-lg p-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />

                <span
                    className={
                        task.completed
                            ? "line-through text-gray-400"
                            : "text-white"
                    }
                >
                    {task.text}
                </span>

            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
                Delete
            </button>

        </div>
    );
}