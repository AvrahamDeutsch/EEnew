import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskDetails from './taskDetails';
import Task from './task';
import store from '../store/store.js';
import Container from '../components/Container';


import {
    Row, Col, Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';



class ContainerDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            viewTasksMode: false,
            addTaskMode: false,
            containerEditMode: false

        }
    }

    componentWillUpdate() {

    }

    viewAllTasks() {
        var arr = [];
        this.props.tasksArray.map((task, index) => {
            console.log(task);
            return arr.push(<Row>
                <Col>
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
                        mileStoneNumber={this.props.mileStoneNumber}
                        containerId={this.props.containerId}
                    /> </Col></Row>
            )
        })
        if (arr.length >= 1) {
            arr.push(
                <Row>
                    <Col>
                        {this.state.viewTasksMode ? <Button onClick={() => this.setState({ viewTasksMode: !this.state.viewTasksMode })} >close</Button> : null}
                    </Col>
                </Row>)
        }
        return arr
    }

      addTask() {
        //  store.dispatch({ type: 'CATEGORY_CHANGED', payload: this.props.currentCategory })

        return  (
            <Task
                mileStoneNumber={this.props.mileStoneNumber}
                containerId={this.props.containerId}
                taskUserStory={this.props.taskContainerUserStory}
                arrayResult={this.props.arrayResult}
                total='0'
            // addTasksMode={()=>this.addTasksMode()}
            />)
    }

    changeEditContainerMode(bool) {
        return this.setState({ containerEditMode: bool })
    }

    editContainer() {
        return (
            <Container
                key={this.state.value}
                // arrayResult={this.props.arrayResult}
                containerName={this.props.containerName}
                mileStoneNumber={this.props.mileStoneNumber}
                numberOfTasks={this.props.numberOfTasks}
                currentCategory={this.props.currentCategory}
                totalWorkNumber={this.props.totalWorkNumber}
                tasksArray={this.props.tasksArray}
                taskContainerUserStory={this.props.taskContainerUserStory}
                id={this.props.id}
                addContainerMode={true}
                changeEditContainerMode={(bool) => this.changeEditContainerMode(bool)}
                editContainerMode={this.state.containerEditMode}
            />

        )
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader tag="h3">{this.props.containerName}</CardHeader>
                    <CardBody>
                        <Row>
                            <Col>Milestone: {this.props.mileStoneNumber}</Col>
                        </Row>
                        <Row>
                            <Col>
                                Number of tasks is: {this.props.numberOfTasks}
                            </Col>
                        </Row>
                        <Row>
                            <Col>Category: {this.props.currentCategory}</Col>
                        </Row>
                        <Row>
                            <Col>User story: {this.props.taskContainerUserStory ? this.props.projectUserStory[this.props.taskContainerUserStory].userStory : null}</Col>
                        </Row>
                        <Row>
                            <Col><h5>total e.w. : {this.props.totalWorkNumber}</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.tasksArray.length >= 1 ? <Button onClick={() => this.setState({ viewTasksMode: !this.state.viewTasksMode })} >all tasks</Button> : null}{' '}
                                <Button onClick={() => this.setState({ addTaskMode: !this.state.addTaskMode })} >add task</Button>{' '}
                                <Button onClick={() => {
                                    this.setState({ containerEditMode: !this.state.containerEditMode })
                                }} >edit</Button>{' '}


                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                {this.state.viewTasksMode ? this.viewAllTasks() : null}
                                {this.state.addTaskMode ? this.addTask() : null}
                                {this.state.containerEditMode ? this.editContainer() : null}
                            </Col>
                        </Row>

                    </CardBody>
                    <CardFooter className="text-muted"></CardFooter>
                </Card>

            </div>

        )
    }
}
export default connect(store => store)(ContainerDetails);