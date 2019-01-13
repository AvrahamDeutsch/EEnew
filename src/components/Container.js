import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Label, Form, Row, Col, FormGroup } from 'reactstrap';
import Task from './task'
import TaskDetails from './taskDetails'
import store from '../store/store.js'

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            containerId: this.props.id,
            // currentCategory: '',
            currentCategory: this.props.category,
            arrayResult: this.props.arrayResult,
            containerName: this.props.containerName,
            mileStoneNumber: this.props.mileStoneNumber,
            totalWorkNumber: parseFloat(Number(this.props.totalWorkNumber).toFixed(2)),
            taskContainerUserStory: this.props.taskContainerUserStory,
            // tasksUserStoryArray: [''],
            tasksArray: this.props.tasksArray,
            category: this.props.currentCategory,
            allTasksMode: this.props.allTasksMode,
            // allTasksMode:true,
            taskMode: false,
            milestoneMode: 0,
            addContainerMode: this.props.addContainerMode,
            editContainerMode: false
        }
    }


    taskContainerNameChange(e) {
        var value = e.target.value;
        this.setState({ containerName: value });
        console.log(value);
    }

    mileStoneChange(e) {
        var value = parseInt(e.target.value);
        console.log('Entered mileStoneNumber:', value);

        if (value > -1 && value < 5) {
            this.setState({ mileStoneNumber: value, milestoneMode: true });
        }
        else {
            window.alert('Please enter the number from 0 to 4');
            e.target.value = this.state.mileStoneNumber;
        }
    }


    // getTotalWeightedEffort() {
    //     var total = 0
    //     this.state.arrayResult.map((sum => total += sum.total))
    //     this.setState({ totalWorkNumber: total })
    //     return total
    // }



    // userStorySelectChange(e) {  // if user changes Task Container user story => each Task user story should be changed to Task Container user story
    //     var taskContainerUserStory = e.target.value;
    //     this.setState({ taskContainerUserStory: taskContainerUserStory });
    //     var tasksUserStoryArray = this.state.tasksUserStoryArray.slice();
    //     for (let i = 0; i < tasksUserStoryArray.length; i++) {
    //         tasksUserStoryArray[i] = taskContainerUserStory;

    //     }
    //     this.setState({ tasksUserStoryArray: tasksUserStoryArray });
    // }

    // taskUserStorySelectChange(e) {
    //     var us = e.target.value;
    //     if (this.state.taskContainerUserStory !== us) {
    //         this.setState({ taskContainerUserStory: '' })
    //     }

    // }


    isOpen() {
        this.setState({ taskMode: !this.state.taskMode })
    }

    fillcategorySelect() {
        var arr = [<option >select your category</option>]
        this.props.categories.map((category, index) => {
            return this.props.currentCategory === category ?
                arr.push(<option value={category} selected key={index + 1}>{category}</option>) :
                //   console.log(category);
                arr.push(<option value={category} key={index + 1}>{category}</option>)
        })
        return arr
    }

    categorySelected(e) {
        var value = e.target.value;
        console.log(value);
        this.setState({ category: value })

    }

    fillUserStorySelect() {
        var arr = []
        // console.log(  us ,typeof index);
        // if (this.state.taskContainerUserStory != undefined) {
        this.props.projectUserStory.map((us, index) => {
            return index === this.state.taskContainerUserStory
                ? arr.push(<option selected value={index} key={index}>{us.userStory}</option>)
                : arr.push(<option value={index} key={index}>{us.userStory}</option>)
        })
        return arr
    }

    userStorySelected(e) {
        var value = e.target.value;
        console.log(value);
        this.setState({ taskContainerUserStory: parseInt(value) })
    }
    addTask() {
        console.log( this.state.value);
        

        return (<Task
            mileStoneNumber={this.state.mileStoneNumber}
            containerId={this.state.containerId}
            taskUserStory={this.state.taskContainerUserStory}
            arrayResult={this.state.arrayResult}
            total='0'
            addTasksMode={() => this.addTasksMode()}
        />)
    }

    // allTasksMode() {
    //     this.setState({ allTasksMode: !this.state.allTasksMode })
    // }

    addTasksMode() {
        this.setState({ tasksMode: !this.state.tasksMode })
    }

    wiewAllTasks() {
        var arr = [];
        this.state.tasksArray.map((task, index) => {
            console.log(task);
            return arr.push(
                <TaskDetails
                    key={index}
                    taskIndex={index}
                    taskName={task.taskName}
                    component={task.component}
                    complexity={task.complexity}
                    risk={task.risk}
                    LearningDays={task.LearningDays}
                    total={task.days}
                    taskUserStory={task.taskUserStory}
                    details={task.details}
                    assumptions={task.assumptions}
                    mileStoneNumber={this.state.mileStoneNumber}
                    containerId={this.state.containerId}
                />
            )
        })
        return arr
    }

    save() {
        if (!this.state.milestoneMode) {
            alert("enter milesone")
        }

        else if (this.state.containerName === 'Enter the container name') {
            alert('Enter the container name please')
        }

        else {
            console.log(this.state);
            
            store.dispatch({
                type: 'ADD_NEW_CONTAINER', payload: {
                    currentCategory: this.state.currentCategory,
                    containerName: this.state.containerName,
                    mileStoneNumber: this.state.mileStoneNumber,
                    days: this.state.totalWorkNumber,
                    taskContainerUserStory: this.state.taskContainerUserStory,
                    tasks: this.state.tasksArray,
                    category: this.state.category,
                }
            })
            store.dispatch({ type: 'CHANGE_ADD_CONTAINER_MODE' })
        }
        this.setState({})

    }

    editContainer() {
        this.props.changeEditContainerMode(false)
        store.dispatch({
            type: 'EDIT_CONTAINER', payload: this.state
            // {
            //     containerId: this.state.containerId,
            //     currentCategory: this.state.currentCategory,
            //     containerName: this.state.containerName,
            //     milestoneName: this.state.mileStoneNumber,
            //     days: this.state.totalWorkNumber,
            //     taskContainerUserStory: this.state.taskContainerUserStory,
            //     tasks: this.state.tasksArray,
            //     category: this.state.category,
            // }
        })
    }
    render() {

        return (
            <Form>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="name">Task Container Name:</Label>
                            <Input
                                id='name'
                                style={{ fontSize: '20px', width: '100%' }}
                                onBlur={(e) => this.taskContainerNameChange(e)}
                                type="text"
                                placeholder={this.state.containerName}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="exampleSelect">User-story/Requirement:</Label>
                            <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                                onChange={(e) => this.userStorySelected(e)}
                            >
                                {this.fillUserStorySelect()}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="exampleSelect">Category:</Label>
                            <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                                onChange={(e) => this.categorySelected(e)}
                            >
                                {this.fillcategorySelect()}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="milestone">Milestone:</Label>
                            <Input
                                id='milestone'
                                onChange={(e) => this.mileStoneChange(e)}
                                value={this.state.mileStoneNumber}
                                type="number"
                                min='0'
                                max='4'
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>                <Col >
                    <div style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }}>
                        {this.state.tasksArray !== undefined
                            ? `Number of tasks is ${this.state.tasksArray.length}`
                            : ''}</div>
                </Col>
                </Row>
                <Row>
                    <Col>
                        <b>{`Total W.E. ${this.state.totalWorkNumber}`}</b>
                        {/* <b>{ this.state.totalWorkNumber < 1 ? 'Total W.E. 0':  `Total W.E. ${this.state.totalWorkNumber}`}</b> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {!this.props.addContainerMode
                            ? <Button onClick={() => this.save()}>Save</Button>
                            :<Button color="success" onClick={() => this.editContainer()}>Update</Button>}
                        {/* {!this.props.addContainerMode
                            ? <Button onClick={() => this.setState({ allTasksMode: !this.state.allTasksMode })}>All tasks</Button>
                        : null}{' '} */}
                        {!this.props.editContainerMode
                            // ? <Button color="success" onClick={() => this.setState({ editContainerMode: !this.state.editContainerMode })}>Update</Button>
                        
                            ?<Button color="success" onClick={() => this.editContainer()}>Update</Button>
                            : null}{' '}
                        {/* {this.props.editContainerMode ? this.editContainer() : null} */}
                        {/* {!this.props.addContainerMode
                            // ? <Button color="success" onClick={() => this.setState({ editContainerMode: !this.state.editContainerMode })}>Update</Button>
                            ? <Button color="success" onClick={()=>this.props.changeEditContainerMode(true)}>Update</Button>
                            : null}{' '}
                        {!this.props.addContainerMode ? this.editContainer() : null} */}
                    </Col>
                </Row>
            </Form >
        )

    }
}


export default connect(store => store)(Container)