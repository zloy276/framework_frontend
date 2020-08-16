import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Todo from "./Todo";
import {Typography} from "@material-ui/core";



class TaskList extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            tasks: this.props.tasks
        }
        this.delTask = this.props.delTask.bind(this)
    }

    componentDidMount() {
        this.setState({
            tasks: this.props.tasks
        })
    }


    render(){
        return(
            <List>
                { this.props.tasks.map(task => <ListItem key={task.id} ><Todo id={task.id} taskText={task.text} delTask={this.delTask}/></ListItem>)}
            </List>
        )
    }
}

export default TaskList