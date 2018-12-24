import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { Button, Input, Row, Col, FormGroup,Label } from 'reactstrap';
import Task from './task'
import store from'../store/store.js'

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {

            currentCategory: '',
            arrayResult: [],
            currentComplexity: [],
            taskContainerName: this.props.name,
            mileStoneNumber: 0,
            // numberOfTasks: 0,
            totalWorkNumber: 0,
            taskContainerUserStory: {},
            tasksUserStoryArray: [''],
            tasksArray: this.props.tasksArr,
            category:'',

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


    taskContainerNameChange(e) {
        var value = e.target.value;
        console.log(value);
        
        this.setState({ taskContainerName: value });
    }

    // categoryChange(e) {
    //     var value = e.target.value;
    //     axios.get(`http://10.2.2.103:8080/app/find_category/?category=${value}`)
    //         .then(response => {
    //             var arr = []
    //             console.log(response.data);

    //             response.data.arrayResult((component, index) => {
    //                 arr.push({
    //                     id: component._.id,
    //                     category: component.category,
    //                     component: component.component,
    //                     comlexity: [component.low_complexity, component.med_complexity, component.high_complexity]
    //                 })
    //             })
    //             this.setState({ arrayResult: arr });
    //         })
    // }

    mileStoneChange(e) {
        var value = parseInt(e.target.value);
        console.log('Entered mileStoneNumber:', value);

        if (value > -1 && value < 6) {
            this.setState({ mileStoneNumber: value });
        }
        else {
            window.alert('Please enter the number from 0 to 5');
            e.target.value = this.state.mileStoneNumber;
        }
    }

    // numberOfTasksChange(e) {
    //     var tasks = this.state.tasksArray.slice()
    //     var arr = []
    //     tasks.map((task, index) => {
    //         arr.push(
    //             <task />
    //         )
    //     })
    // }

    taskNameChange(e) {
        e.persist();
        var taskName = e.target.value;
        var lineIndex = e.target.attributes.lineindex.nodeValue;
        var taskNamesArray = this.state.taskNamesArray.slice();
        taskNamesArray[lineIndex] = taskName;
        this.setState({ taskNamesArray: taskNamesArray });
        console.log('taskNamesArray', taskNamesArray);
    }


    learningDaysChange(e) {
        var value = parseInt(e.target.value);
        var learningDays = Object.assign({}, this.state.task);
        learningDays.LearningDays = value;

        value >= 0 && value < 11 ?
            this.setState({ task: learningDays }) :
            window.alert('Please enter the number from 0 to 10');

    }

    complexityClickHandler(e) {
        var complexity = 0
        switch (e.target.value) {
            case 0:
                complexity = this.state.currentComplexity[0]
                break;
            case 1:
                complexity = this.statecurrentComplexity[1]
                break;
            case 2:
                complexity = this.statecurrentComplexity[2]
                break;
        }
        var taskComplexity = Object.assign({}, this.state.task);
        taskComplexity.complexity = complexity;
        this.setState({ task: taskComplexity })

    }
    riskClickHandler(e) {
        var risk = 0
        switch (e.target.value) {
            case 'L':
                risk = 1.1
                break;
            case 'M':
                risk = 1.2
                break;
            case 'H':
                risk = 1.3
                break;
        }
        var task = Object.assign({}, this.state.task);
        task.risk = risk;
        this.setState({ task: task })

    }

    sumTotalTask() {
        var total = Object.assign({}, this.state.task);
        total.total = total.risk * total.complexity;
        this.setState({ total: total })
    }

    getTotalWeightedEffort() {
        var total = 0
        this.state.arrayResult.map((sum => total += sum.total))
        this.setState({ totalWorkNumber: total })
        return total
    }

    componentChange(e) {
        var temp = this.state.currentComplexity.slice();
        var currentComponent = temp.filter(current => current.component === e.target.value);   // we need to find a document with category={category}&component={component}  and we know that category is same for each taskcontainer
        this.setState({ currentComplexity: currentComponent.comlexity })
    }

    userStorySelectChange(e) {  // if user changes Task Container user story => each Task user story should be changed to Task Container user story
        var taskContainerUserStory = e.target.value;
        console.log(e);
        
        // this.setState({ taskContainerUserStory: taskContainerUserStory });

        //  HERE WE also HAVE TO CHANGE this.state.tasksUserStoryArray    !!!! 
        var tasksUserStoryArray = this.state.tasksUserStoryArray.slice();
        for (let i = 0; i < tasksUserStoryArray.length; i++) {
            tasksUserStoryArray[i] = taskContainerUserStory;

        }
        this.setState({ tasksUserStoryArray: tasksUserStoryArray });
    }

    taskUserStorySelectChange(e) {
        var us = e.target.value;
        if (this.state.taskContainerUserStory !== us) {
            this.setState({ taskContainerUserStory: '' })
        }

    }

    detailsHandler(e) {
        var task = Object.assign({}, this.state.task)
        task.details = e.target.value
        this.setState({ task: task })

    }

    assumptionsHandler(e) {

        var task = Object.assign({}, this.state.task)
        task.assumptions = e.target.value
        this.setState({ task: task })

    }

    isOpen() {
        this.setState({ taskMode: !this.state.taskMode })
    }

    fillcategorySelect(){
        var arr = []
        this.props.categories.map((category, index) => {
        //   console.log(category);
          arr.push(<option key={index}>{category}</option>)
        })
        return arr
    }

    categorySelected(e){
        var value = e.target.value;
        this.setState({category:value})
        store.dispatch({type:'CATEGORY_CHANGED', payload:value})

    }

    fillUserStorySelect(){
        var arr = []
        this.props.projectUserStory.map((us, index) => {
        //   console.log(us);
          arr.push(<option key={index} value={us.userStory}>{us.userStory}</option>)
        })
        return arr
    }
    userStorySelected(e){
        var value = e.target.value;
        console.log(value);
        
        this.setState({taskContainerUserStory:value})
    }


    save(){
        store.dispatch({type:'ADD_NEW_CONTAINER', payload:{
            currentCategory : this.state.currentCategory,
            containerName:this.state.taskContainerName,
            milestoneName:this.state.mileStoneNumber,
            days:this.state.totalWorkNumber,
            taskContainerUserStory:this.state.taskContainerUserStory,
            tasks:this.state.tasksArray,
            category:this.state.category,
            taskContainerUserStory: this.state.taskContainerUserStory
        }})

    
    }

    render() {
        return (


            <div style={{ width: '100%', border: 'solid gray 1px', margin: '5px', marginLeft: '0px' }}>
                <Row style={{ width: '100%', /*borderBottom: 'solid gray 1px'*/ margin: '5px', marginLeft: '0px', textAlign: 'left' }}>
                    <Col sm="6" md="3" ><b>Task Container Name:</b></Col>
                    <Col sm="6" md="3">
                        <Input style={{ fontSize: '20px', width: '100%' }} size='40' onBlur={(e) => this.taskContainerNameChange(e)} type="text" defaultValue={this.props.taskContainerName}></Input>
                    </Col>
                    <Col sm="6" md='2'>Number Of Tasks:</Col>
                    <Col sm="6" md="1">
                        {/* <Input onChange={() => this.numberOfTasksChange()} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='1' max='30' defaultValue='1'></Input> */}
                        <div style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }}>{() => this.state.tasksArray.length}</div>
                    </Col>
                    <Col sm="6" md="2">Milestone:</Col>
                    <Col sm="6" md="1">
                        <Input onChange={(e) => this.mileStoneChange(e)} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='0' max='5' defaultValue='0'></Input>

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
                                    <Label for="exampleSelect">Category:</Label>
                                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.categorySelected(e)}>
                                        {this.fillcategorySelect()}
                                    </Input>
                                </FormGroup>
                                {/* <CategorySelect onChange={this.categoryChange} /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" md='6'>
                                User Story:
                            </Col>
                            <Col sm="6" md='6'>
                            <FormGroup>
                                    <Label for="exampleSelect">User Story:</Label>
                                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.userStorySelected(e)}>
                                        {this.fillUserStorySelect()}
                                    </Input>
                                </FormGroup>
                                {/* <UserStorySelect className='floatLeft' userStories={this.props.userStories} onChange={this.userStorySelectChange} /> */}

                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" md='6'>
                        <Row>
                            <Col>
                                <b>{` Total W.E.   ${this.state.totalWorkNumber}`}</b>
                            </Col>
                        </Row>
                        {/* <Col><b>{this.getTotalWeightedEffort()} sum of all tasks weightedEffort</b></Col> */}
                    </Col>
                </Row>
                <Row style={{ width: '90%', margin: '5px', marginLeft: '0px' }}>
                    <Col>
                        <Button onClick={() => this.isOpen()}>Tasks</Button>

                        {/* {this.state.taskMode ? <Task
                            taskContainerUserStory={this.state.taskContainerUserStory}
                            numberOfTasks={this.state.numberOfTasks}
                            arrayResult={this.state.arrayResult}
                            complexArray={this.state.complexArray}
                            riskArray={this.state.riskArray}
                            onClick={this.complexityClickHandler}
                            riskClickHandler={this.riskClickHandler}
                            learningDaysChange={this.learningDaysChange}
                            learningDaysArray={this.state.learningDaysArray}
                            onChange={this.componentChange}
                            taskUserStorySelectChange={this.taskUserStorySelectChange}
                            userStories={this.props.userStories}
                            taskNameChange={this.taskNameChange}
                            detailsHandler={this.detailsHandler}
                            assumptionsHandler={this.assumptionsHandler}
                            total={this}
                        /> 
                            : null}  */}

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <Task /> */}
                        {/* {this.state.taskMode ? <Button onClick={() => (this.props.dispatch({ type: "SAVE_TASK_CONTAINER_DATA", payload: this.state }))}>Save</Button> : null} */}
                        <Button onClick={() => this.save()}>Save</Button>
                    </Col>
                </Row>

            </div>
        )

    }
}


export default connect(store => store)(Container)