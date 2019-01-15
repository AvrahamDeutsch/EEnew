import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store.js'
import { Button, Input, Row, Col, FormGroup, Label, Form, CustomInput } from 'reactstrap';
import axios from 'axios'



class Task extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskName: this.props.taskName,
            component: this.props.component,
            currentComplexity: this.props.currentComplexity,
            complexity: this.props.complexity,
            risk: this.props.risk,
            LearningDays: this.props.LearningDays,
            days: this.props.days,
            taskUserStory: this.props.taskUserStory,
            details: this.props.details,
            assumptions: this.props.assumptions,
            containerId: this.props.containerId,
            mileStoneNumber: this.props.mileStoneNumber,
            currentCategory: this.props.currentCategory,
            upDate: this.props.upDate,
            taskIndex: this.props.taskIndex,
            arrayResult: [],
            componentSelectedMode: this.props.componentSelectedMode
        }
    }
    componentDidMount() {
        let initialArray = [];
        fetch(`http://10.2.3.128:8080/app/find_category/?category=${this.props.currentCategory}`)
            .then(response => {
                return response.json();
            }).then(data => {
                initialArray = data.arrayResult.map((component) => {
                    return {
                        component: component.component,
                        complexity: [
                            component.low_complexity,
                            component.med_complexity,
                            component.high_complexity]
                    }
                });
                console.log(initialArray);

                this.setState({
                    arrayResult: initialArray,
                });
            });
        this.afterSetStateFinished()


    }

    afterSetStateFinished() {
        var days = parseFloat(Number(((this.state.complexity + this.state.LearningDays) * this.state.risk)).toFixed(2))
        this.setState({ days: days })
        // console.log('learning:',this.state.LearningDays,' complexity:',this.state.complexity,' risk:',this.state.risk);
    }

    fillUserStorySelect() {
        var arr = []
        this.props.projectUserStory.map((us, index) => {
            console.log(typeof this.state.taskUserStory, this.state.taskUserStory);
            if (this.state.taskUserStory != undefined) {
                this.state.taskUserStory === index
                    ? arr.push(<option selected value={index} key={index}>{us.userStory}</option>)
                    : arr.push(<option value={index} key={index}>{us.userStory}</option>)
            } else {
                arr.push(<option value={index} key={index}>{us.userStory}</option>)
            }

        })
        return arr
    }

    userStorySelected(e) {
        var value = e.target.value;
        console.log(value);
        this.setState({ taskUserStory: parseInt(value) })
    }

    handleComplexity(e) {

        var value = parseInt(e.target.value);
        // console.log(value);
        this.setState({ complexity: value }, () => {
            this.afterSetStateFinished()
        })
    }

    handleRisk(e) {

        var value = parseFloat(e.target.value);
        console.log(value);
        this.setState({ risk: value }, () => {
            this.afterSetStateFinished()
        })
    }

    fillComponentSelect() {
        let arr = [<option>select component</option>]
        this.state.arrayResult.map((component, index) => {
            if (this.props.component === component.component) {
                arr.push(<option selected value={index} key={index}>{component.component}</option>)
            } else {
                arr.push(<option value={index} key={index}>{component.component}</option>)
            }
        })
        return arr

    }

    componentSelected(e) {
        var value = e.target.value;
        // console.log(value);
        this.setState({
            currentComplexity: this.state.arrayResult[value].complexity,
            component: this.state.arrayResult[value].component,
            componentSelectedMode: true
        }, () => {
            this.afterSetStateFinished()
        })
    }

    learningDaysChange(e) {
        var value = parseInt(e.target.value);
        // console.log('learning:', value);
        this.setState({ LearningDays: value }, () => {
            this.afterSetStateFinished()
        })
    }

    fillComplexitySelect() {
        var arr = [];
        var complexityName = ['low', 'med', 'high'];
        if (this.state.currentComplexity === undefined) {
            return (this.setState({ currentComplexity: [0, 0, 0] }))
        }
        for (let i = 0; i < 3; i++) {
            if (parseInt(this.state.currentComplexity[i]) == this.state.complexity) {
                // console.log(this.state.complexity, "---->", this.state.currentComplexity[i]);
                arr.push(<CustomInput type="radio" id={`complexity${i}`} name="complexity"
                    checked
                    label={complexityName[i]}
                    value={this.state.currentComplexity[i]}
                    onClick={(e) => this.handleComplexity(e)} />)
            } else {
                // console.log(typeof this.state.complexity, "---->", typeof this.state.currentComplexity[i]);
                // arr.push(<input type="radio" name="complexity" value={this.state.currentComplexity[i]} onClick={(e) => this.handleComplexity(e)} />, ` ${complexityName[i]} `)
                arr.push(<CustomInput type="radio" id={`complexity${i}`} name="complexity"
                    label={complexityName[i]}
                    value={this.state.currentComplexity[i]}
                    onClick={(e) => this.handleComplexity(e)} />)
            }

        }
        return arr;
    }

    fillRiskSelect() {
        var riskNames = ['low', 'med', 'high'];
        let riskArr = [];
        for (let i = 0; i < 3; i++) {
            if (this.state.risk == `1.${i + 1}`) {
                riskArr.push(<CustomInput
                    checked
                    type="radio"
                    id={`risk${i}`}
                    name="risk"
                    label={riskNames[i]}
                    value={`1.${i + 1}`}
                    onClick={(e) => this.handleRisk(e)} />)
            } else {
                riskArr.push(<CustomInput
                    type="radio"
                    id={`risk${i}`}
                    name="risk"
                    label={riskNames[i]}
                    value={`1.${i + 1}`}
                    onClick={(e) => this.handleRisk(e)} />)
            }
        }
        return riskArr
    }

    save() {
        console.log(this.state);
        let copy = { ...this.state };
        let index = this.state.taskUserStory;
        let id = this.props.projectUserStory[index]._id;
        copy.taskUserStory = { index, id }
        store.dispatch({
            type: 'ADD_TASK',
            payload: copy
        })
    }

    edit() {
        let copy = { ...this.state };
        let index = this.state.taskUserStory;
        let id = this.props.projectUserStory[index]._id;
        copy.taskUserStory = { index, id }
        store.dispatch({
            type: 'CHANGE_TASK',
            payload: copy
        })
        this.props.changeEditMode(false)
    }

    render() {

        return (
            <Form>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="TaskName">Task Name:</Label>
                            <Input type="text" id="TaskName"
                                // placeholder={this.state.taskName}
                                placeholder='task name ...'
                                defaultValue={this.state.taskName}
                                onChange={(e) => this.setState({ taskName: e.target.value })} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleSelect">User Story:</Label>
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

                <FormGroup>
                    <Label for="component">Component:</Label>
                    <Input
                        type="select"
                        name="component"
                        id="component"
                        onChange={(e) => this.componentSelected(e)}
                    >
                        {this.fillComponentSelect()}
                    </Input>

                </FormGroup>
                {this.state.componentSelectedMode ?
                    <Row form>
                        <Col md={4}>
                            <FormGroup >
                                <Label for="exampleCheckbox">Complexity:</Label>
                                <div>
                                    {this.fillComplexitySelect()}
                                    <FormGroup>
                                        <Input type='number'
                                            Value={this.state.complexity}
                                            onBlur={(e) => this.handleComplexity(e)} min='0'>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup >
                                <Label for="exampleCheckbox">Risk:</Label>
                                <div>
                                    {this.fillRiskSelect()}
                                    <div className='complexityNumber'>{this.state.risk}</div>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleAddress">Learning days:</Label>
                                <Input type="number" id="exampleAddress"
                                    min='0' max='10' defaultValue='0'
                                    onChange={(e) => this.learningDaysChange(e)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    : null}

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleAddress">Details:</Label>
                            <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                                placeholder={this.state.details}
                                onBlur={(e) => this.setState({ details: e.target.value })} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleAddress">Assumptions:</Label>
                            <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                                placeholder={this.state.assumptions}
                                onBlur={(e) => this.setState({ assumptions: e.target.value })} />
                        </FormGroup>
                    </Col>
                </Row>
                <div><b>w.e. : {this.state.days}</b></div>

                {!this.state.upDate
                    ? <Button color="info" onClick={() => this.save()}>Save</Button>
                    : <Button color="success" onClick={() => this.edit()}>Update</Button>
                }
            </Form>

        )
    }
}

export default connect(store => store)(Task)

