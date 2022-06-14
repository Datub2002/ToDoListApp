import React, { Component } from 'react';
import { Container } from '../Components/Container'
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from '../Themes/ToDoListDarkTheme';
import { Dropdown } from '../Components/Dropdown';
import { Heading2, Heading3, Heading4 } from '../Components/Heading';
import { Label, Input, TextField } from '../Components/TextField';
import { Button } from '../Components/Button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../Components/Table';
import { connect } from 'react-redux';
import { addTaskAction, changeThemeAction, doneTaskAction, editTaskAction, removeTaskAction, updateTaskAction } from '../../redux/actions/ToDoListAction';
import { arrTheme } from '../Themes/arrTheme';



class ToDoList extends Component {

    state = {
        taskName: '',
        disabled : true,
    }

    // xỬ lý các sự kiện 
    renderTaskToDo = () => {
        return this.props.TaskList.filter(task => !task.done).map((item, i) => {
            return (
                <Tr key={i} >
                    <Th className='align-middle'>
                        {item.taskName}
                    </Th>
                    <Th className='text-right'>
                        <Button onClick={() => { this.editTask(item) }} className='mr-1'>

                            <i className='fa fa-edit'></i>
                        </Button>
                        <Button onClick={() => this.doneTask(item.taskName)} className='mr-1'>
                            <i className='fa fa-check'></i>
                        </Button>
                        <Button onClick={() => this.removeTask(item.taskName)} className='mr-1'>
                            <i className='fa fa-trash'></i>

                        </Button>
                    </Th>
                </Tr>
            )
        })
    }
    editTask = (task) => {
        this.setState({
            disabled : false
        }, () =>{
            
            this.props.dispatch(
                editTaskAction(task)
            )
        })
    }
    doneTask = (taskName) => {
        this.props.dispatch(
            doneTaskAction(taskName)
        )
    }
    removeTask = (taskName) => {
        this.props.dispatch(
            removeTaskAction(taskName)
        )
    }

    renderTaskCompleted = () => {
        let { TaskList } = this.props;
        return TaskList.filter(item => item.done).map((item, i) => {
            return (
                <Tr key={i}>
                    <Th className='align-middle'>
                        {item.taskName}
                    </Th>
                    <Th className='text-right'>
                        <Button onClick={() => this.removeTask(item.taskName)}><i className='fa fa-trash'></i></Button>
                    </Th>
                </Tr>
            )
        })
    }
    handleChange = (event) => {

        let { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => console.log(this.state))



    }
    handleAddTask = () => {
        // Lay thong tin nguoi dung nhap vao tu input

        // Tao ra 1 task obj :
        let objTask = {
            id: Date.now(),
            taskName: this.state.taskName,
            done: false,
        }
        //Dua task obj len redux thong qua phuong thuc dispatch
        this.props.dispatch(
            addTaskAction(objTask)
        )
    }
    renderOption = () => {
        return arrTheme.map((item, index) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })

    }
    dispatchToRedux = (event) => {
        let { value } = event.target;
        this.props.dispatch(
            changeThemeAction(value)
        )
    }
    // trước khi render cần gán lại state, ko sử dụng props từ redux truyền đến nữa
    // UNSAFE_componentWillReceiveProps(newProps)
    // {
    //     console.log('current props', this.props);
    //     console.log('new props',newProps);
    //     this.setState({
    //         taskName : newProps.TaskEdit.taskName
    //     })
    // }
    
    // KHONG SU DUNG DUOC LIFECYCLE NAY 
        // static getDerivedStateFromProps(newProps,currentState)
        // {
        //     return {...currentState,taskName : newProps.TaskEdit.taskName}
        //     // gia tri state k thay doi
        //     // return null

        // }
    render() {
        return (
            <ThemeProvider theme={this.props.ThemeToDoList}>

                <Container className='w-50'>
                    <Dropdown onChange={this.dispatchToRedux}>
                        {this.renderOption()}

                    </Dropdown>
                    <Heading2 className='mt-3 mb-3'>
                        To Do List
                    </Heading2>
                    <TextField value={this.state.taskName} name='taskName' onChange={this.handleChange} label='Task Name' className='w-50 mt-2'>

                    </TextField>
                    <Button onClick={() => { this.handleAddTask() }} className='ml-3'><i className='fa fa-plus'></i> Add Task</Button>
                    {
                        
                        this.state.disabled ?  <Button disabled onClick={() =>{
                                                    this.props.dispatch(updateTaskAction(this.state.taskName))
                                                }} className='ml-3'><i className='fa fa-upload'></i> Update Task</Button> : <Button  onClick={() =>{
                                                    let {taskName} = this.state;
                                                   
                                                    this.setState({
                                                        disabled : true,
                                                        taskName : ''
                                                    },() =>this.props.dispatch(updateTaskAction(taskName)))
                                                    
                                                }} className='ml-3'><i className='fa fa-upload'></i> Update Task</Button>
                    }


                    <Heading3 className='mt-5 mb-3'>Task To Do </Heading3>
                    <Table>
                        <Thead>

                            {this.renderTaskToDo()}
                        </Thead>



                    </Table>

                    <Heading3 className='mt-5 mb-3'>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}


                        </Thead>
                    </Table>

                </Container>
            </ThemeProvider>
        );
    }
    componentDidUpdate(prevProps,prevState)
    {
        if( prevProps.TaskEdit.id !== this.props.TaskEdit.id)
        {
            this.setState({
                taskName : this.props.TaskEdit.taskName
            })
        }
    }
}



const mapStateToProps = state => {
    return {
        ThemeToDoList: state.ToDoListReducer.toDoListTheme,
        TaskList: state.ToDoListReducer.taskList,
        TaskEdit: state.ToDoListReducer.taskEdit,

    }
}
export default connect(mapStateToProps)(ToDoList);