import React, { Component } from 'react';
import axios from "axios";
import Todo from "./Todo";
import AddTask from "./AddTask"
import '../styles/App.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TaskList from "./taskList";
import {Typography} from "@material-ui/core";





class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            tasks: []
        };
        this.delTask = this.delTask.bind(this)
        this.addTask = this.addTask.bind(this)
    }
    componentDidMount() {
        let url = "http://localhost:3000/tasks"
        axios.get(url)
            .then(response =>{
                this.setState({
                    tasks: response.data
                })
            })
    }

    addTask = (taskText) =>{
        axios.post('http://localhost:3000/tasks',{
                text: taskText}).then(response=>{
            this.setState({
                tasks: this.state.tasks.concat(response.data)
            })
        })
    }

    delTask = (id) => {
        axios.delete('http://localhost:3000/tasks/'+id)
        this.setState({tasks: this.state.tasks.filter((task)=>{
            return task.id !== id
        })})
}
    render() {
        return (
            <div style={{
                alignItems  :'center',
                width:'500px'
            }}>
                <AddTask addTask={this.addTask}/>
                {this.state.tasks.length?
                    <TaskList tasks={this.state.tasks} delTask={this.delTask}/>:
                    <Typography variant='h3' style={{
                        textAlign:'center',
                        padding:'10px'
                    }}> Нет заданий </Typography>}
            </div>
        );
    }
}

export default App;

