import { SET_TASKS, SET_TASK_ID } from "./Actions";

const InitialState = {
    tasks:[],
    taskID:1,
}

function taskReducer(state = InitialState, action) {

    switch (action.type) {
        case SET_TASKS:
            return {...state, tasks : action.payload};
        case SET_TASK_ID:
            return {...state, taskID : action.payload};
        default:
            return state;
    }
}

export default taskReducer;