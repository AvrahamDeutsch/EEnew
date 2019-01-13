import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store.js'
import { Button, Input, Row, Col, FormGroup, Label, Form, CustomInput } from 'reactstrap';



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
            days: parseFloat(Number(this.props.total).toFixed(2)),
            taskUserStory: this.props.taskUserStory,
            details: this.props.details,
            assumptions: this.props.assumptions,
            containerId: this.props.containerId,
            mileStoneNumber: this.props.mileStoneNumber,
            catergory: this.props.catergory,
            upDate: this.props.upDate,
            // index: this.props.index,
            taskIndex: this.props.taskIndex
        }
    }

    afterSetStateFinished() {
        var days = ((this.state.complexity + this.state.LearningDays) * this.state.risk);
        this.setState({ days: days })
        // console.log('learning:',this.state.LearningDays,' complexity:',this.state.complexity,' risk:',this.state.risk);
    }

    fillUserStorySelect() {
        var arr = []
        this.props.projectUserStory.map((us, index) => {
            // console.log(typeof this.state.taskUserStory, this.state.taskUserStory);
            return this.state.taskUserStory.index === index
                ? arr.push(<option selected value={index} key={index}>{us.userStory}</option>)
                : arr.push(<option value={index} key={index}>{us.userStory}</option>)
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
        console.log(value);
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
        // await store.dispatch({ type: 'CATEGORY_CHANGED', payload: this.state.catergory})
        var arr = []
        this.props.arrayResult.map((component, index) => {
            // this.props.taskContainerUserStory == us.userStory ?
            //     arr.push(<option selected value={us.userStory} key={index}>{us.userStory}</option>) :
            //   console.log(us);
            return arr.push(<option selected value={index} key={index}>{component.component}</option>)
        })
        return arr
    }

    componentSelected(e) {
        var value = e.target.value;
        console.log(value);

        this.setState({
            currentComplexity: this.props.arrayResult[value].complexity,
            component: this.props.arrayResult[value].component
        }, () => {
            this.afterSetStateFinished()
        })
        console.log(this.state.currentComplexity);
    }

    learningDaysChange(e) {
        var value = parseInt(e.target.value);
        console.log('learning:', value);

        this.setState({ LearningDays: value }, () => {
            this.afterSetStateFinished()
        })
        // console.log(this.state.containerId, '==>', this.state.mileStoneNumber);

    }

    fillComplexitySelect() {
        var arr = [];
        var complexityName = ['low', 'med', 'high'];
        if (this.state.currentComplexity === undefined) {
            return (this.setState({ currentComplexity: [0, 0, 0] }))

        }

        for (let i = 0; i < 3; i++) {

            if (parseInt(this.state.currentComplexity[i]) === this.state.complexity) {
                // console.log(typeof this.state.complexity, "---->", typeof this.state.currentComplexity[i]);
                arr.push(<CustomInput type="radio" id={`complexity${i}`} name="complexity"
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
        let index = this.state.taskUserStory.index;
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
                                placeholder={this.state.taskName}
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
                    <Label for="exampleSelect">Component:</Label>
                    <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={(e) => this.componentSelected(e)}
                    >
                        {this.fillComponentSelect()}
                    </Input>
                </FormGroup>

                <Row form>
                    <Col md={4}>
                        <FormGroup >
                            <Label for="exampleCheckbox">Complexity:</Label>
                            <div>
                                {this.fillComplexitySelect()}
                                <FormGroup>
                                    <Input type='number'
                                        defaultValue={this.state.complexity}
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
                                <CustomInput type="radio" id="risk0" name="risk" label='low' value='1.1' onClick={(e) => this.handleRisk(e)} />
                                <CustomInput type="radio" id="risk1" name="risk" label='med' value='1.2' onClick={(e) => this.handleRisk(e)} />
                                <CustomInput type="radio" id="risk2" name="risk" label='high' value='1.3' onClick={(e) => this.handleRisk(e)} />
                                <div className='complexityNumber'>{this.state.risk}</div>
                            </div>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleAddress">Learning days:</Label>

                            <Input type="number" id="exampleAddress"
                                min='0' max='10' defaultValue='0'
                                placeholder="with a placeholder"
                                onChange={(e) => this.learningDaysChange(e)} type='number' defaultValue='0' />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
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

// {/* <div className="LineDetail">
//                     <Row >
//                         <Col sm='6' md='2'>Task Name:</Col>
//                         <Col sm='6' md='3'>
//                             <Input size='30' type="text"
//                                 placeholder={this.state.taskName}
//                                 onChange={(e) => this.setState({ taskName: e.target.value })}
//                             />
//                         </Col>
//                         <Col sm='6' md='3'>
//                             <FormGroup>
//                                 <Label for="exampleSelect">Component:</Label>
//                                 <Input
//                                     type="select"
//                                     name="select"
//                                     id="exampleSelect"
//                                     onChange={(e) => this.componentSelected(e)}
//                                 >
//                                     {this.fillComponentSelect()}
//                                 </Input>
//                             </FormGroup>
//                         </Col>
//                         <Col sm='6' md='4'>
//                             <FormGroup tag="fieldset">
//                                 <legend>Complexity:</legend>
//                                 {this.fillComplexitySelect()}
//                                 {/* <input type="radio" id='low' name="complexity" value={this.state.currentComplexity[0]} onClick={(e) => this.handleComplexity(e)} />low{' '}
//                                 <input type="radio" id='med' name="complexity" value={this.state.currentComplexity[1]} onClick={(e) => this.handleComplexity(e)} />med{' '}
//                                 <input type="radio" id='high' name="complexity" value={this.state.currentComplexity[2]} onClick={(e) => this.handleComplexity(e)} />high{' '} */}
//                                 <Input type='number' defaultValue={this.state.complexity} onBlur={(e) => this.handleComplexity(e)} min='0'></Input>
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col sm='6' md='2'>
//                             Task user story:
//                         </Col>
//                         <Col sm='6' md='3'>
//                             <FormGroup>
//                                 <Label for="exampleSelect">User Story:</Label>
//                                 <Input
//                                     type="select"
//                                     name="select"
//                                     id="exampleSelect"
//                                     onChange={(e) => this.userStorySelected(e)}
//                                 >
//                                     {this.fillUserStorySelect()}
//                                 </Input>
//                             </FormGroup>
//                         </Col>

//                         <Col sm='6' md='2'>
//                             Learning days:
//                         </Col>
//                         <Col sm='6' md='1'>
//                             <Input className='complexityNumber' style={{ padding: '0px' }}
//                                 onChange={(e) => this.learningDaysChange(e)} type='number' min='0' max='10' defaultValue='0'></Input>

//                         </Col>

//                         <Col sm='6' md='4'>

//                             <FormGroup tag="fieldset">
//                                 <legend>Risk:</legend>
//                                 <input type="radio" id='low' name="risk" value="1.1" onClick={(e) => this.handleRisk(e)} />low{' '}
//                                 <input type="radio" id='med' name="risk" value="1.2" onClick={(e) => this.handleRisk(e)} />med{' '}
//                                 <input type="radio" id='high' name="risk" value="1.3" onClick={(e) => this.handleRisk(e)} />high{' '}
//                                 <div className='complexityNumber'>{this.state.risk}</div>
//                             </FormGroup>

//                         </Col>

//                     </Row>
//                     <Row>
//                         <Col sm='6' md='4'>
//                             <FormGroup>
//                                 <Input
//                                     type="textarea"
//                                     name="text"
//                                     id="exampleText"
//                                     placeholder={this.state.details}
//                                     onBlur={(e) => this.setState({ details: e.target.value })} />
//                             </FormGroup>
//                         </Col>
//                         <Col sm='6' md='4'>
//                             <FormGroup>
//                                 <Input
//                                     type="textarea"
//                                     name="text"
//                                     id="exampleText"
//                                     placeholder={this.state.assumptions}
//                                     onBlur={(e) => this.setState({ assumptions: e.target.value })} />
//                             </FormGroup>
//                         </Col>
//                         <Col sm='6' md='4'>
//                             <div><b>w.e. : {this.state.days}</b></div>
//                         </Col>
//                         <Col sm='6' md='4'>
//                             {!this.state.upDate
//                                 ? <Button color="info" onClick={() => this.save()}>Save</Button>
//                                 : <Button color="success" onClick={() => this.edit()}>Update</Button>
//                             }

//                         </Col>
//                     </Row>


//                 </div> */}