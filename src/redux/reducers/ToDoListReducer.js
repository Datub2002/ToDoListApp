import { DarkTheme } from "../../JSS_StyledComponent/Themes/ToDoListDarkTheme";
import { addTask, changeTheme, doneTask, editTask, removeTask, updateTask } from "../types/ToDoListTypes";
import { arrTheme } from "../../JSS_StyledComponent/Themes/arrTheme";
const currentState = {
    toDoListTheme : DarkTheme,
    taskList : [
        {id: 1,taskName : 'task 1',done : true},
        {id: 2,taskName : 'task 2',done : true},
        {id: 3,taskName : 'task 3',done : false},
        {id: 4,taskName : 'task 4',done : false},
    ],

    taskEdit : {id: 0,taskName : '',done : true},

};

export default (state = currentState,action) =>{
    switch(action.type){
        case addTask : {
            if(action.newTask.taskName.trim() === '')
            {
                alert("you haven't enter a character :( ")
                return {...state}
            }
            let newTaskList = [...state.taskList];
            let index = newTaskList.findIndex(item => item.taskName === action.newTask.taskName )
            if(index !== -1) {
                alert('this action has already exist')
                return {...state}
            }else{
                newTaskList.push(action.newTask);
            }
            //set state trong redux
                state.taskList = newTaskList;
            return {...state}
        }
        case changeTheme : {
            console.log(action);
            let theme = arrTheme.find((item) =>{
                return item.id == action.themeId;
                // action.themeId === string;

                // item.id === number 
            })
            console.log(theme);
            if(theme)
            {
                state.toDoListTheme = theme.theme
            }
            return {...state}
        }
        case doneTask :
            {
                console.log(action);
                //findIndex
                let newTaskList = [...state.taskList];
                let index = newTaskList.findIndex((item) =>{
                    return item.taskName === action.taskName
                })
                if(index !== -1)
                {
                   newTaskList[index].done = true;                 
                }
               
                state.taskList = newTaskList;
                return {...state}

            }
            case removeTask :
                {
                    console.log(action);
                    let newTaskList = [...state.taskList];
                let index = newTaskList.findIndex((item) =>{
                    return item.taskName === action.taskName
                })
                if(index !== -1)
                {
                   newTaskList.splice(index,1);                 
                }
                state.taskList = newTaskList;
                return {...state}
                }
                case editTask :
                    {
                        return {...state,taskEdit : action.task}
                    }
            case updateTask : {

                console.log(action);
                let taskListUpdate = [...state.taskList];
                let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)
                if ( index !== -1)
                {
                    taskListUpdate[index].taskName = action.taskName;
                }
                // setState :
                    state.taskList = taskListUpdate;

                    state.taskEdit = {id : -1 , taskName : '' , done : false}
                return {...state}
            }


        default : 
            return {...state};
    }
    
}