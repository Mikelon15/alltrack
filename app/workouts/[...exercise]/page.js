'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "components/table";

import { useWorkouts, useWorkoutsDispatch } from '../../context/workouts.js';

const exercise = [
    {
        name: 'pushups',
        columns: [
            {
                name: 'reps',
                type: 'number'
            },
        ],
    },
    {
        name: 'squat',
        columns: [
            {
                name: 'weight',
                type: 'number'
            },
            {
                name: 'reps',
                type: 'number'
            },
        ],
    },
    {
        name: 'pullups',
        columns: [
            {
                name: 'reps',
                type: 'number'
            },
            {
                name: 'weight',
                type: 'number'
            },
        ],
    }

]

export default function Workout({ params }) {
    const workouts = useWorkouts();
    const workoutsDispatch = useWorkoutsDispatch();

    const [id, setId] = useState(null);
    const [entry, setEntry] = useState(null);
    const [isAddingExcercise, setIsAddingExcercise] = useState(false);

    useEffect(() => {
        if (!id) setId(params.exercise[1])
        if (!entry || !entry.id) setEntry(workouts[id])
        console.log('entry', entry)
    })


    const addingExcercise = () => {
        setIsAddingExcercise(!isAddingExcercise)
    }

    const addExcercise = (i) => {
        const newOne = {
            ...entry, exercises: [
                ...entry.exercises, {
                    ...exercise[i], data: [], id: entry.exercises.length
                }
            ]
        }
        setEntry(newOne)
        workoutsDispatch({ type: 'changed', id: entry.id, workout: newOne })
    }

    const deleteExcercise = (excercise) => {
        const newEntry = { ...entry, exercises: entry.exercises.filter((e) => e.id !== excercise.id) }
        setEntry(newEntry)
        workoutsDispatch({ type: 'changed', id: entry.id, workout: newEntry })
    }

    const updateName = (e) => {
        const newEntry = { ...entry, name: e.target.value }
        setEntry(newEntry)
        workoutsDispatch({ type: 'changed', id: entry.id, workout: newEntry })
    }

    return (
        <main className="w-full text-center p-2">
            <div className="flex items-end mt-2">
                <h1 className="text-xl font-bold mx-4">
                    <Link href="/" className="underline underline-offset-4 mx-1">Alltrak</Link></h1>/
                <Link href="/workouts" className="underline underline-offset-4 mx-2">workouts</Link>/
            </div>

            {(entry && entry.exercises && entry.name) &&
                <div>
                    <input className="text-lg font-bold text-center rounded mt-4 bg-neutral-600 p-2 left" value={entry.name} onChange={(e) => updateName(e)} />

                    <div className="mb-48">
                        {entry.exercises?.map((exercise) => <Table key={exercise.id} initTable={exercise} deleteTable={deleteExcercise} />)}
                    </div>

                    <button className="bg-neutral-700 text-white rounded-lg px-8 p-2 fixed bottom-8" onClick={addingExcercise}>Add excercise</button>

                    {isAddingExcercise &&
                        <div className="h-full w-full bg-black bottom-0 fixed">
                            <ul className="mt-12 p-8">
                                {exercise.map((excercise, i) => <li className="p-4 bg-neutral-800 my-2" key={`wl-${i}`} onClick={() => { addExcercise(i); addingExcercise() }}>{excercise.name}</li>)}
                            </ul>
                            <button className="bg-neutral-700 text-white absolute bottom-0 left-8 mb-24 p-4" onClick={addingExcercise}>Cancel</button>
                        </div>
                    }
                </div>
            }

        </main>
    );
}
