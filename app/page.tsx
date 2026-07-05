import TaskBoard from "@/components/TaskBoard";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-900 flex justify-center items-start p-10">
            <TaskBoard />
        </main>
    );
}