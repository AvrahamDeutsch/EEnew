import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskDetails from './taskDetails';
import Task from './task';
import store from '../store/store.js';
import Container from '../components/Container';


import {
    Row, Col, Card, Button, CardHeader, CardFooter, CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';



class ContainerDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            viewTasksMode: false,
            addTaskMode: false,
            editContainerMode: true,
            containerDeleteMode: false

        }
    }

    componentWillReceiveProps(props){
        this.setState({})

    }

    viewAllTasks() {
        var arr = [];
        this.props.tasksArray.map((task, index) => {
            // console.log(task);
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
                        currentCategory={this.props.currentCategory}
                        currentComplexity={task.currentComplexity}
                    />
                </Col>
            </Row>
            )
        })
        if (arr.length >= 1) {
            arr.push(
                <Row>
                    <Col>
                        <br />
                        {this.state.viewTasksMode ? <Button onClick={() => this.setState({ viewTasksMode: !this.state.viewTasksMode })} >close</Button> : null}
                    </Col>
                </Row>)
        }
        return arr
    }

    addTask() {

        return (
            <Task
                mileStoneNumber={this.props.mileStoneNumber}
                containerId={this.props.containerId}
                taskUserStory={this.props.taskContainerUserStory}
                currentCategory={this.props.currentCategory}
                complexity={0}
                risk={0}
                LearningDays={0}
                componentSelectedMode={false}
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
                containerId={this.props.containerId}
                changeEditContainerMode={(bool) => this.changeEditContainerMode(bool)}
                editContainerMode={this.state.containerEditMode}
                addContainerMode={false}
            />

        )
    }

    deleteDialog() {

        return (<div>
            <Modal isOpen={this.state.containerDeleteMode}>
                <ModalHeader >Are you sure you want to delete the container?</ModalHeader>
                <ModalBody>Deleting the container will delete all data/tasks its contains</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        this.deleteContainer(this.props.containerId, this.props.mileStoneNumber)
                    }}>Delete</Button>{' '}
                    <Button color="primary" onClick={() => this.setState({ containerDeleteMode: false })}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        )

    }

    deleteContainer(containerId, mileStoneNumber) {
        store.dispatch({ type: 'DELETE_CONTAINER', payload: { containerId, mileStoneNumber } })
        this.setState({ containerDeleteMode: false })
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
                            <Col>User story: {this.props.taskContainerUserStory != undefined ? this.props.projectUserStory[this.props.taskContainerUserStory].userStory : null }</Col>
                        </Row>
                        <Row>
                            <Col><h5>Total e.w. : {this.props.totalWorkNumber}</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.tasksArray.length >= 1 ? <Button onClick={() => this.setState({ viewTasksMode: !this.state.viewTasksMode })} >all tasks</Button> : null}{' '}
                                <Button onClick={() => this.setState({ addTaskMode: !this.state.addTaskMode })} >add task</Button>{' '}
                                <Button onClick={() => this.setState({ containerEditMode: !this.state.containerEditMode })} >edit</Button>{' '}
                                <Button color="danger" onClick={() => this.setState({ containerDeleteMode: !this.state.containerDeleteMode })} >delete</Button>{' '}
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                {this.state.viewTasksMode ? this.viewAllTasks() : null}
                                {this.state.addTaskMode ? this.addTask() : null}
                                {this.state.containerEditMode ? this.editContainer() : null}
                                {this.state.containerDeleteMode ? this.deleteDialog() : null}
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