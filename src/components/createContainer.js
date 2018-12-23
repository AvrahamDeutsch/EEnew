import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Row, Col,Line } from 'reactstrap';
import Task from './task'

class createContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
            currentCategory: '',
            arrayResult: [],
            currentComplexity: [],
            taskContainerName: this.props.name,
            mileStoneNumber: 0,
            numberOfTasks: 1,
            totalWorkNumber: 0,
            taskContainerUserStory: '',
            tasksUserStoryArray: [''],
            tasksArray: this.props.tasksArr,

            task: {
                taskName: '',
                component: '',
                complexity: 0,
                risk: 0,
                LearningDays: 0,
                total: 0,
                TaskUserStory: '',
                details: '',
                assumptions: '',
            },
            taskMode: true

        }
    }

    render() {
        return (
            <div style={{ width: '100%', border: 'solid gray 1px', margin: '5px', marginLeft: '0px' }}>
                <Row style={{ width: '100%', /*borderBottom: 'solid gray 1px'*/ margin: '5px', marginLeft: '0px', textAlign: 'left' }}>
                    <Col sm="6" md="3" ><b>Task Container Name:</b></Col>
                    <Col sm="6" md="3">
                        <Input style={{ fontSize: '20px', width: '100%' }} size='40' onChange={this.taskContainerNameChange} type="text" defaultValue={this.props.taskContainerName}></Input>
                    </Col>
                    <Col sm="6" md='2'>Number Of Tasks:</Col>
                    <Col sm="6" md="1">
                        <Input onChange={this.numberOfTasksChange} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='1' max='30' defaultValue='1'></Input>
                    </Col>
                    <Col sm="6" md="2">Milestone:</Col>
                    <Col sm="6" md="1">
                        <Input onChange={this.mileStoneChange} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='0' max='5' defaultValue='0'></Input>

                    </Col>
                </Row>
                <Row style={{ width: '100%', margin: '5px', marginLeft: '0px' }} >
                    <Col style={{ textAlign: 'left' }} sm="6" md='6'>
                        <Row>
                            <Col sm="6" md='6'>
                                Category:
                            </Col>
                            <Col sm="6" md='6'>
                                {/* <CategorySelect onChange={this.categoryChange} /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" md='6'>
                                User Story:
                            </Col>
                            <Col sm="6" md='6'>
                                {/* <UserStorySelect className='floatLeft' userStories={this.props.userStories} onChange={this.userStorySelectChange} /> */}

                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" md='6'>
                        <Row>
                            <Col>
                                <b> Total W.E.</b>
                            </Col>
                        </Row>
                        {/* <Col><b>{this.getTotalWeightedEffort()} sum of all tasks weightedEffort</b></Col> */}
                    </Col>
                </Row>
                <Row style={{ width: '90%', margin: '5px', marginLeft: '0px' }}>
                    <Col>
                        <Button onClick={() => this.isOpen()}>Tasks</Button>

                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Task/>
                        <Button onClick={() => this.save()}>Save container</Button>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default connect(store => store)(createContainer);