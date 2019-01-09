import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Row, Col, FormGroup } from 'reactstrap';
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
            totalWorkNumber: this.props.totalWorkNumber,
            taskContainerUserStory: this.props.taskContainerUserStory,
            // tasksUserStoryArray: [''],
            tasksArray: this.props.tasksArray,
            category: this.props.currentCategory,
            allTasksMode: this.props.allTasksMode,
            // allTasksMode:true,
            taskMode: false,
            milestoneMode: 0,
            addContainerMode: this.props.addContainerMode,
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

        if (value > -1 && value < 6) {
            this.setState({ mileStoneNumber: value, milestoneMode: true });
        }
        else {
            window.alert('Please enter the number from 0 to 5');
            e.target.value = this.state.mileStoneNumber;
        }
    }


    getTotalWeightedEffort() {
        var total = 0
        this.state.arrayResult.map((sum => total += sum.total))
        this.setState({ totalWorkNumber: total })
        return total
    }



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
        this.setState({ category: value })
        store.dispatch({ type: 'CATEGORY_CHANGED', payload: value })

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
        // }else{
        //     return ''
        // }
    }

    userStorySelected(e) {
        var value = e.target.value;
        console.log(value);
        this.setState({ taskContainerUserStory: parseInt(value) })
    }
    addTask() {
        return (<Task
            mileStoneNumber={this.state.mileStoneNumber}
            containerId={this.state.containerId}
            taskUserStory={this.state.taskContainerUserStory}
            arrayResult={this.state.arrayResult}
            total='0'
            addTasksMode={()=>this.addTasksMode()}
        />)
    }


    allTasksMode() {
        this.setState({ allTasksMode: !this.state.allTasksMode })
    }
   
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
        //   this.setState({})
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
            store.dispatch({
                type: 'ADD_NEW_CONTAINER', payload: {
                    currentCategory: this.state.currentCategory,
                    containerName: this.state.containerName,
                    milestoneName: this.state.mileStoneNumber,
                    days: this.state.totalWorkNumber,
                    // taskContainerUserStory: this.state.taskContainerUserStory,
                    taskContainerUserStory: this.state.taskContainerUserStory,
                    tasks: this.state.tasksArray,
                    category: this.state.category,
                }
            })
            store.dispatch({ type: 'CHANGE_ADD_CONTAINER_MODE' })
        }
        this.setState({})

    }

    render() {

        return (


            <div style={{ width: '100%', border: 'solid gray 1px', margin: '5px', marginLeft: '0px' }}>
                <Row style={{ width: '100%', margin: '5px', marginLeft: '0px', textAlign: 'left' }}>
                    <Col sm="6" md="3" ><b>Task Container Name:</b></Col>
                    <Col sm="6" md="3">
                        <Input
                            style={{ fontSize: '20px', width: '100%' }}
                            size='40'
                            onBlur={(e) => this.taskContainerNameChange(e)}
                            type="text"
                            placeholder={this.state.containerName}
                        />
                    </Col>
                    {/* <Col sm="6" md='2'>Number Of Tasks:</Col> */}
                    <Col sm="6" md="1">
                        <div style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }}>
                            {this.state.tasksArray !== undefined
                                ? `Number of tasks is ${this.state.tasksArray.length}`
                                : 'Number of tasks is 0'}</div>
                    </Col>
                    <Col sm="6" md="2">Milestone:</Col>
                    <Col sm="6" md="1">
                        <Input
                            style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }}
                            onChange={(e) => this.mileStoneChange(e)}
                            value={this.state.mileStoneNumber}
                            type="number"
                            min='0'
                            max='5'

                        />
                    </Col>
                </Row>
                <Row style={{ width: '100%', margin: '5px', marginLeft: '0px' }} >
                    <Col style={{ textAlign: 'left' }} sm="6" md='6'>
                        <Row>
                            <Col sm="6" md='6'>
                                Category:
                            </Col>
                            <Col sm="6" md='6'>
                                <FormGroup>
                                    {/* <Label for="exampleSelect">Category:</Label> */}
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
                        </Row>
                        <Row>
                            <Col sm="6" md='6'>
                                User Story:
                            </Col>
                            <Col sm="6" md='6'>
                                <FormGroup>
                                    {/* <Label for="exampleSelect">User Story:</Label> */}
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
                    </Col>
                    <Col sm="6" md='6'>
                        <Row>
                            <Col>
                                <b>{`Total W.E. ${this.state.totalWorkNumber}`}</b>
                                {/* <b>{this.state.totalWorkNumber == undefined ? 'Total W.E. 0':  `Total W.E. ${this.state.totalWorkNumber}`}</b> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ width: '90%', margin: '5px', marginLeft: '0px' }}>
                    <Col>
                        {this.props.addContainerMode
                            ? <Button onClick={() => this.save()}>Save</Button>
                            : <Button onClick={() => this.isOpen()}>Add task</Button>}
                            {/* // : <Button onClick={() => store.dispatch({ type: 'ADD_TASK_MODE' })}>Add task</Button>} */}

                    </Col>
                    <Col>
                        {!this.props.addContainerMode
                            ? <Button onClick={() => this.setState({ allTasksMode: !this.state.allTasksMode })}>All tasks</Button>
                            : null}


                    </Col>
                </Row>

                <Row style={{ width: '90%', margin: '5px', marginLeft: '0px', borderTop: 'solid grey 1px' }}>
                    <Col>

                        {/* {this.props.addTaskMode ? this.addTask() : null} */}
                        {/* {this.state.taskMode ? this.addTask() : null} */}

                        {/* {this.state.allTasksMode ? this.wiewAllTasks() : null} */}

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <Task /> */}
                        {/* {this.state.taskMode ? <Button onClick={() => (this.props.dispatch({ type: "SAVE_TASK_CONTAINER_DATA", payload: this.state }))}>Save</Button> : null} */}

                    </Col>
                </Row>

            </div>
        )

    }
}


export default connect(store => store)(Container)