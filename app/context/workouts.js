'use client'

import { createContext, useContext, useReducer } from 'react';


const WorkoutsContext = createContext(null);

const WorkoutsDispatchContext = createContext(null);

export function WorkoutsProvider({ children }) {
    const [workouts, dispatch] = useReducer(
        workoutReducer,
        initialWorkouts,
    );

    return (
        <WorkoutsContext.Provider value={workouts}>
            <WorkoutsDispatchContext.Provider value={dispatch}>
                {children}
            </WorkoutsDispatchContext.Provider>
        </WorkoutsContext.Provider>
    );
}

export function useWorkouts() {
    return useContext(WorkoutsContext);
}

export function useWorkoutsDispatch() {
    return useContext(WorkoutsDispatchContext);
}

function workoutReducer(workouts, action) {
    switch (action.type) {
        case 'added':
            return {...workouts, [action.workout.id]: action.workout}
        case 'changed': {
            return {...workouts, [action.id]: action.workout }
        }
        case 'deleted': {
            return {...workouts, [action.id] : undefined }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialWorkouts = {
    1 : {
        name: 'random workout',
        id: 1,
        exercises: [{
            name: 'bench press',
            id: 0,
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
            data: [
                {
                    weight: 12,
                    reps: 10
                },
                {
                    weight: 21,
                    reps: 10
                },
                {
                    weight: 42,
                    reps: 10
                }
            ]
        },
        {
            name: 'pushups',
            id: 2,
            columns: [
                {
                    name: 'reps',
                    type: 'number'
                },
            ],
            data: [
                {
                    reps: 10
                },
                {
                    reps: 10
                },
                {
                    reps: 10
                }
            ]
        }]
    },
    2 : {
        name: 'another workout',
        id: 2,
        exercises: [{
            name: 'pullups',
            id: 0,
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
            data: [
                {
                    weight: 12,
                    reps: 10
                },
                {
                    weight: 21,
                    reps: 10
                },
                {
                    weight: 42,
                    reps: 10
                }
            ]
        },
        {
            name: 'pushups',
            id: 1,
            columns: [
                {
                    name: 'reps',
                    type: 'number'
                },
            ],
            data: [
                {
                    reps: 10
                },
                {
                    reps: 10
                },
                {
                    reps: 10
                }
            ]
        }]
    }
}