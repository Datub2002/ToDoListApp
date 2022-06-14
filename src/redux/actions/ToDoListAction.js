import { addTask, changeTheme, doneTask, editTask, removeTask, updateTask } from "../types/ToDoListTypes";

export const addTaskAction = (newTask) => ({
    type : addTask,
    newTask
})
export const changeThemeAction = (themeId) => ({
    type : changeTheme,
    themeId
})
export const doneTaskAction = (taskName) => ({
    type : doneTask,
    taskName
})
export const removeTaskAction = (taskName) => ({
    type : removeTask,
    taskName
})
export const editTaskAction = (task) =>(
    {
        type : editTask,
        task
    }
)
export const updateTaskAction = (taskName) =>(
    {
        type : updateTask,
        taskName
    }
)