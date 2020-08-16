import React from "react"
import axios from 'axios'
import Input from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


export default class AddTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        var val = e.target.value;
        this.setState({newTask: val});
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target
        if (this.state.newTask !== '')
            this.props.addTask(this.state.newTask)
        else
            console.log('лох')
        form.reset()
    }

    render() {
        return (
                <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container
                          direction='row'
                          justify='space-between'
                          alignItems='center'>
                    <TextField id="standard-basic" label="Standard" onChange={this.onChange} style={{width:'300px'}}/>
                    <Button variant='outlined' color='primary' type="submit"> &#10010;</Button>
                    </Grid>
                </form>
        )
    }
}


