'use client'

import { createContext, useContext, useReducer } from 'react';

const WorkoutEntryContext = createContext(null);

const WorkoutEntryDispatchContext = createContext(null);

export function WorkoutEntryProvider({ children }) {
    const [workoutEntry, dispatch] = useReducer(
        workoutReducer,
        {
            id: null,
            name: '',
            exercises: []
        },
    );

    return (
        <WorkoutEntryContext.Provider value={workoutEntry}>
            <WorkoutEntryDispatchContext.Provider value={dispatch}>
                {children}
            </WorkoutEntryDispatchContext.Provider>
        </WorkoutEntryContext.Provider>
    );
}

export function useWorkoutEntry() {
    return useContext(WorkoutEntryContext);
}

export function useWorkoutEntryDispatch() {
    return useContext(WorkoutEntryDispatchContext);
}

function workoutReducer(workoutEntry, action) {
    switch (action.type) {
        case 'selected':
            console.log(action)
            return {...action.workout};
        case 'changed': {
            return workoutEntry.map(t => t.id === action.id ? action.workout : t);
        }
        case 'deleted': {
            return workoutEntry.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
