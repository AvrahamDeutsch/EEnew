import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './store/store'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';

import './App.css';
import Container from './components/Container';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      currentContainer: null,
      containerSelectMode: false,
      addContainerMode: false,
      value: null

    }
  }

  componentDidMount() {
    store.dispatch({ type: 'GET_ALL_CATEGORIES' });
    store.dispatch({ type: 'GET_ALL_PROJECTS' });
  }

  fillProgectsSelect() {
    var arr = []
    this.props.projects.map((project, index) => {
      return arr.push(<option key={index} value={project._id}>{project.projectName}</option>)
    })
    return arr
  }

  projectSelected(e) {
    var value = e.target.value;
    store.dispatch({ type: 'CURRENT_PROJECT', payload: value })
  }

  fillContainersSelect() {
    var arr = [<option style={{ color: 'red' }}>Select container</option>]
    this.props.containers.map((container, index) => {
      // console.log('container=>', container);
      return arr.push(<option key={index} value={index}>{container.containerName}</option>)
    })
    return arr
  }
  containersSelected(e) {
    var value = e.target.value;
    // console.log('value====', value);
    // console.log('con==>', this.state.containersArray);

    this.setState({ containerSelectMode: false })
    this.setState({
      value: value,
      currentContainer: this.props.containers[value],
      containerSelectMode: true
    })
    // console.log(this.state.currentContainer);
  }

  specificContainer() {
    let container = <Container
      key={this.state.value}
      // arrayResult={this.props.arrayResult}
      containerName={this.state.currentContainer.containerName}
      mileStoneNumber={this.state.currentContainer.milestoneName}
      numberOfTasks={this.state.currentContainer.tasks.length}
      currentCategory={this.state.currentContainer.category}
      totalWorkNumber={this.state.currentContainer.days}
      tasksArray={this.state.currentContainer.tasks}
      taskContainerUserStory={this.state.currentContainer.taskContainerUserStory}
      id={this.state.currentContainer._id}
      addContainerMode={true}
    />
    return container

  }

  createContainer() {

    return (
      <Container
        containerName='Enter the container name'
        addContainerMode={false}
        totalWorkNumber={0}
        taskContainerUserStory={null}
      />
    )
  }

  allContainers() {
    var arr = []
    var props = this.props.containers;
    // console.log(props.length);
    if (props.length > 0) {
      props.map((container, index) => {
        console.log(container);
        return arr.push(
          <Container
            key={index}
            containerName={container.containerName}
            mileStoneNumber={container.milestoneName}
            numberOfTasks={container.tasks.length}
            currentCategory={container.category}
            totalWorkNumber={container.days}
            tasksArray={container.tasks}
            taskContainerUserStory={container.taskContainerUserStory}
            id={container._id}
            addContainerMode={true}
          />
        )
      })
    }
    return arr
  }

  fillMilestoneSelect() {
    var arr = []
    this.props.mileStone.map((ms, index) => {
      return arr
      // arr.push(<option  key = {index} value >{ms.milestoneName}</option>)
    })
    return arr
  }

  MilestoneSelected(e) {
    var value = e.target.value;
    console.log(value);
    // store.dispatch({type:'CURRENT_PROJECT', payload: value})
  }

  userStoryList() {
    let arr = [];
    this.props.projectUserStory.map((elm, index) => {
      arr.push(<Row  className={elm.numOfTasks == 0 ?'NotUserSttoryAssociatedTask':'UserSttoryAssociatedTask'} >
        <Col med='6'>{elm.userStory}</Col>
        <Col med='3'>{elm.numOfTasks}</Col>
        <Col>
          <Button size="sm" onClick={() => store.dispatch({ type: 'CHANGE_ADD_CONTAINER_MODE' })}>Add container</Button>
        </Col>
      </Row>
      )
    })
    return arr
  }


  render() {


    return (

      <Row>
        <Col>
          {this.userStoryList()}
        </Col>
        <Col>
          <Form>

            <FormGroup>
              <Label for="exampleSelect">Select project</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder='Select project'
                onChange={(e) => this.projectSelected(e)}
              >
                {this.fillProgectsSelect()}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Select container</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={(e) => this.containersSelected(e)}
              >
                {this.fillContainersSelect()}
              </Input>
            </FormGroup>

            <Button onClick={() => this.setState({ allContainersMound: !this.state.allContainersMound })}>All containers</Button>

            {this.state.allContainersMound ? this.allContainers() : null}

            {this.props.addContainerMode ? this.createContainer() : null}

            {this.state.containerSelectMode ? this.specificContainer() : null}

          </Form>
        </Col>
      </Row>



    );
  }
}

export default connect(store => store)(App);
