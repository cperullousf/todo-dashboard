/*
==========================================================
Component: TaskList
Purpose: Displays the list of tasks currently visible.

Component Type: Server Component

Props:
tasks - Array of tasks to display.
onToggle - Function passed down from TaskBoard.
onDelete - Function passed down from TaskBoard.
==========================================================
*/

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {

    return (
        <div className="space-y-3">

            {/* map() returns a new array of React components for each
                task. Each TaskCard receives the data it needs from
                TaskBoard through props. */}

            {tasks.length === 0 ? (
                <p className="text-center text-gray-400 py-6">
                    No tasks to display.
                </p>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            )}

        </div>
    );
}