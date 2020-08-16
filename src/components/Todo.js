import React from "react"
import axios from 'axios'
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isDone: false,
            id: this.props.id,
            correctable: false,
            task:this.props.taskText,
            corrected: ''
        }
        this.delItem.bind(this)
        this.task = this.task.bind(this)
        this.updateTask = this.updateTask.bind(this)
    }

    updateTask = (e) =>{
        e.preventDefault();
        if (this.state.corrected !== '') {
            axios.patch(
                'http://localhost:3000/tasks/' + this.state.id, {
                    text: this.state.corrected,
                    id: this.state.id
                })
                .then(response => {
                    this.setState({
                        task: response.data.text,
                        id: response.data.id
                    })
                })
            this.setState({correctable: false})
        }
    }

    task = () => {
        if(this.state.correctable)
            return( <form noValidate autoComplete="off" onSubmit={this.updateTask}>
                        <TextField id="filled-basic" label="Filled" variant="filled"
                                   onChange={(e)=>{
                                       this.setState({
                                           corrected: e.target.value
                                       })
                                       console.log(this.state.corrected)}}/>
                    </form>
            )
        else return (<Typography variant={"caption"} style={{textDecoration: this.state.isDone?'line-through':'none'}}>{this.state.task}</Typography>)
    }

    render() {
        const classes = () => makeStyles((theme)=>({
            grid: {
                width: '400px',
                padding:'1px'
            }
        }))
        return (
            <Paper elevation={3} className={classes.paper} style={{width:'100%'}}>
                <Grid
                    container direction='row'
                    justify='space-between'
                    alignItems='center'
                    className={classes.grid}
                >
                    <input type='checkbox' onChange={()=>{this.setState({
                        isDone: !this.state.isDone
                    })}} />
                    {this.task()}
                    <ButtonGroup>
                        <Button
                            color='secondary'
                            variant='outlined'
                            onClick={this.delItem}
                        >
                            &#10008;
                        </Button>
                        <Button
                            color='primary'
                            variant='outlined'
                            disabled={this.state.correctable}
                            onClick={()=>this.setState({correctable:!this.state.correctable})}>
                            &#9998;
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Paper>
        )
    }
    delItem = () =>{
        this.props.delTask(this.state.id)
    }

}

export default Todo