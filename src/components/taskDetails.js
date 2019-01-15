import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Row, Col, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Task from './task.js'
import store from '../store/store.js'


class TaskDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskName: this.props.taskName,
            component: this.props.component,
            currentComplexity: this.props.currentComplexity,
            complexity: this.props.complexity,
            risk: this.props.risk,
            LearningDays: this.props.LearningDays,
            total: this.props.total,
            taskUserStory: this.props.taskUserStory,
            details: this.props.details,
            assumptions: this.props.assumptions,
            containerId: this.props.containerId,
            mileStoneNumber: this.props.mileStoneNumber,
            catergory: this.props.catergory,
            taskIndex: this.props.taskIndex,
            deleteMode: false,
            taskEditMode: false
        }
    }
    changeEditMode(bool) {
        this.setState({ taskEditMode: bool })
    }

    taskUpdate() {
        return (
            <Task
                taskName={this.state.taskName}
                complexity={this.state.complexity}
                currentComplexity={this.state.currentComplexity}
                risk={this.state.risk}
                LearningDays={this.state.LearningDays}
                total={this.state.total}
                taskUserStory={this.state.taskUserStory.index}
                details={this.state.details}
                assumptions={this.state.assumptions}
                mileStoneNumber={this.state.mileStoneNumber}
                containerId={this.state.containerId}
                projectUserStory={this.state.taskContainerUserStory}
                arrayResult={this.state.arrayResult}
                upDate={true}
                taskIndex={this.state.taskIndex}
                currentCategory={this.props.currentCategory}
                component={this.state.component}
                componentSelectedMode={true}
                changeEditMode={(bool) => this.changeEditMode(bool)}
            />
        )
    }

    deleteTask(taskIndex, containerId, mileStoneNumber) {
        console.log(taskIndex);
        store.dispatch({ type: 'DELETE_TASK', payload: { taskIndex, containerId, mileStoneNumber } })
        this.setState({ deleteMode: false })
        this.setState({})
    }

    deleteDialog() {

        return (<div>
            <Modal isOpen={this.state.deleteMode}>
                <ModalHeader >Are you sure you want to delete the task?</ModalHeader>
                <ModalBody>Deleting the task will delete all data its contains</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        this.deleteTask(this.state.taskIndex, this.state.containerId, this.state.mileStoneNumber)
                    }}>Delete</Button>{' '}
                    <Button color="primary" onClick={() => this.setState({ deleteMode: false })}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
       
    }

    render() {
        return (
            <div >

                <Row>
                    <Col >
                        <Card body>
                            <CardTitle><h3>{this.state.taskName}</h3></CardTitle>
                            <Row>
                                <Col><b>component :</b> {this.state.component}</Col>
                            </Row>
                            <Row>
                                <Col><b>user story:</b> {this.props.projectUserStory[this.state.taskUserStory.index].userStory}</Col>
                            </Row>
                            <Row>
                                <Col><b>complexity days:</b> {this.state.complexity}</Col>
                            </Row>
                            <Row>
                                <Col><b>Learning days:</b> {this.state.LearningDays}</Col>
                            </Row>
                            <Row>
                                <Col><b>risk days:</b> {this.state.risk}</Col>
                            </Row>
                            <Row>
                                <Col><b>details:</b> {this.state.details}</Col>
                            </Row>
                            <Row>
                                <Col><b>assumptions: </b>{this.state.assumptions}</Col>
                            </Row>

                            <Row>
                                <Col >
                                    <Col><h5><b>total e.w. : {this.state.total}</b></h5></Col>
                                    <Button color='success' onClick={() => this.setState({ taskEditMode: !this.state.taskEditMode })}>Edit</Button>{' '}
                                    <Button color='danger' onClick={() => this.setState({ deleteMode: true })}>Delete</Button>{' '}
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                </Row>

                <div>
                    {this.state.taskEditMode ? this.taskUpdate() : null}
                    {this.state.deleteMode ? this.deleteDialog() : null}

                </div>
            </div>
        );
    }
}

export default connect(store => store)(TaskDetails)