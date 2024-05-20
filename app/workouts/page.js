'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useWorkouts, useWorkoutsDispatch } from '../context/workouts.js';
import { useWorkoutEntryDispatch } from '../context/workoutEntry.js';

function WorkoutList() {
    const workouts = useWorkouts();

    return (
        <div className="w-1/2 m-auto mt-24">
            {Object.values(workouts).map((workout, i) =>
                <Link key={workout.id} href={`workouts/exercise/${workout.id}`}
                    className="flex flex-row m-4 justify-center p-4 bg-neutral-700 rounded-md hover:bg-neutral-800">
                    {workout.name}
                </Link>
            )}
        </div>
    );
}

function NewWorkout() {
    const router = useRouter()
    const workouts = useWorkouts();
    // const entryDispatch = useWorkoutEntryDispatch();
    const workoutsDispatch = useWorkoutsDispatch();

    return (
        <button className="bg-primary-500 text-white p-2 rounded-md mt-4 border border-solid border-white"
            onClick={() => {
                let id = parseInt(Object.keys(workouts)?.at(-1))
                let newWorkout = { id: id ? id + 1 : 1, name: 'New Workout', exercises: [] }
                router.push(`/workouts/exercise/${newWorkout.id}`)
                workoutsDispatch({ type: 'added', workout: newWorkout })
                // entryDispatch({ type: 'selected', workout: newWorkout })
            }}>Add Workout</button>
    )

}

export default function Workouts() {
    return (
        <main className="w-full text-center p-4">
            <div className="flex items-end">
                <h1 className="text-2xl font-bold">Altrak</h1>
                <Link href="/" className="underline underline-offset-4">home</Link> / workouts
            </div>

            <WorkoutList></WorkoutList>
            <NewWorkout></NewWorkout>
        </main>

    );
}
