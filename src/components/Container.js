import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Label, Form, Row, Col, FormGroup } from 'reactstrap';
import store from '../store/store.js'

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            containerId: this.props.containerId,
            currentCategory: this.props.currentCategory,
            containerName: this.props.containerName,
            mileStoneNumber: this.props.mileStoneNumber,
            totalWorkNumber: parseFloat(Number(this.props.totalWorkNumber).toFixed(2)),
            taskContainerUserStory: this.props.taskContainerUserStory,
            tasksArray: this.props.tasksArray,
            category: this.props.currentCategory,
            allTasksMode: this.props.allTasksMode,
            taskMode: false,
            milestoneMode: 0,
            editContainerMode: false
        }
    }


    taskContainerNameChange(e) {
        var value = e.target.value;
        this.setState({ containerName: value });
        // console.log(value);
    }

    mileStoneChange(e) {
        var value = parseInt(e.target.value);
        // console.log('Entered mileStoneNumber:', value);

        if (value > -1 && value < 5) {
            this.setState({ mileStoneNumber: value, milestoneMode: true });
        }
        else {
            window.alert('Please enter the number from 0 to 4');
            e.target.value = this.state.mileStoneNumber;
        }
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
        var arr = [<option>select user story</option>]
        // console.log(  us ,typeof index);
        // if (this.state.taskContainerUserStory != undefined) {
        this.props.projectUserStory.map((us, index) => {
            // console.log(us);
            if (us.userStory != null) {
                return index === this.state.taskContainerUserStory
                    ? arr.push(<option selected value={index} key={index}>{us.userStory}</option>)
                    : arr.push(<option value={index} key={index}>{us.userStory}</option>)
            }
        })
        return arr
    }

    userStorySelected(e) {
        var value = e.target.value;
        console.log(value);
        this.setState({ taskContainerUserStory: parseInt(value) })
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
                    mileStoneNumber: this.state.mileStoneNumber,
                    days: this.state.totalWorkNumber,
                    taskContainerUserStory: this.state.taskContainerUserStory,
                    tasks: this.state.tasksArray,
                    category: this.state.category,
                }
            })
        }
        this.setState({})

    }

    editContainer() {
        console.log(this.state);

        this.props.changeEditContainerMode(false)
        store.dispatch({
            type: 'EDIT_CONTAINER', payload:
            {
                containerId: this.state.containerId,
                currentCategory: this.state.currentCategory,
                containerName: this.state.containerName,
                mileStoneNumber: this.state.mileStoneNumber,
                days: this.state.totalWorkNumber,
                taskContainerUserStory: this.state.taskContainerUserStory,
                tasks: this.state.tasksArray,
                category: this.state.category,
            }
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
                                placeholder={!this.state.containerName ? 'Enter the container name' : null}
                                defaultValue={this.state.containerName ? this.state.containerName : null}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label  for="exampleSelect">User-story/Requirement:</Label>
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
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.addContainerMode ? <Button onClick={() => this.save()}>Save</Button>:null}
                        {this.props.editContainerMode ? <Button color="success" onClick={() => this.editContainer()}>Update</Button>:null}
                    </Col>
                </Row>
            </Form >
        )

    }
}


export default connect(store => store)(Container)