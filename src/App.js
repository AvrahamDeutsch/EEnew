import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './store/store'
import { FormGroup, Label, Input, Row, Col, ListGroupItem, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Container from './components/Container';
import ContainerDetails from './components/containerDetails.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      currentContainer: null,
      containerSelectMode: false,
      addContainerMode: this.props.addContainerMode,
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
      project._id === this.props.currentProject
        ? arr.push(<option selected key={index} value={project._id}>{project.projectName}</option>)
        : arr.push(<option key={index} value={project._id}>{project.projectName}</option>)
    })
    return arr
  }

  projectSelected(e) {
    var value = e.target.value;
    store.dispatch({ type: 'CURRENT_PROJECT', payload: value })
  }

  selectContainer() {
    return (
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
        <br />
        {this.state.value != null ? this.specificContainer() : null}
      </FormGroup>
    )
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
  }

  specificContainer() {

    var container = this.props.containers[this.state.value];
    // console.log(parseInt(this.state.value));
    return (
      <ContainerDetails
        key={this.state.value}
        containerName={container.containerName}
        mileStoneNumber={container.milestoneName}
        currentCategory={container.category}
        totalWorkNumber={container.days}
        tasksArray={container.tasks}
        taskContainerUserStory={container.taskContainerUserStory}
        id={container._id}
        addContainerMode={true}
      />)
  }

  createContainer(e) {

    return (
      <Container
      containerName ='Enter the container name'
      mileStoneNumber='Choose a num'
      addContainerMode={this.state.addContainerMode}
      totalWorkNumber={0}

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
          <Row>
            <Col>
              <ContainerDetails
                key={index}
                containerName={container.containerName}
                mileStoneNumber={container.mileStoneNumber}
                numberOfTasks={container.tasks.length}
                currentCategory={container.category}
                totalWorkNumber={container.days}
                tasksArray={container.tasks}
                taskContainerUserStory={container.taskContainerUserStory}
                containerId={container._id}
                addContainerMode={true}
              />
            </Col>
          </Row>
        )
      })
    }
    return arr
  }

  // fillMilestoneSelect() {
  //   var arr = []
  //   this.props.mileStone.map((ms, index) => {
  //     return arr
  //     // arr.push(<option  key = {index} value >{ms.milestoneName}</option>)
  //   })
  //   return arr
  // }

  // MilestoneSelected(e) {
  //   var value = e.target.value;
  //   console.log(value);
  //   // store.dispatch({type:'CURRENT_PROJECT', payload: value})
  // }

  userStoryList() {

    let arr = [];
    this.props.projectUserStory.map((elm, index) => {
      arr.push(
        <ListGroupItem
          color={elm.numOfTasks == 0 ? "warning" : "info"}
          className="justify-content-between">{elm.userStory} <Badge pill>{elm.numOfTasks}</Badge>
        </ListGroupItem>
      )
    })
    return arr
  }

  Home() {
    return (
      <div>
        <h3>Welcome to Effort-Evaluator</h3>
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
      </div>
    )
  }

  render() {


    return (
      <Router >
        <container >
          <Row >
            <Col className="header">
              <header className={'container py-2'}>Effort Evaluator</header>
            </Col>
          </Row>
          <Row>
            <Col>
              <li> <Link className='link' to='/' >Home page</Link></li>
              <li> <Link className='link' to='/userStory/list' >user story array</Link></li>
              <li> <Link className='link' to='/container/all-containers' >view all containers</Link></li>
              <li> <Link className='link' to={'/container/add-new-container'} >add new container</Link></li>
              <li> <Link className='link' to={'/container/select-container'} >select container</Link></li>
            </Col>

            <Col>
              <br />
              <Route exact path='/' component={() => this.Home()} />
              <Route path='/userStory/list' component={() => this.userStoryList()} />
              <Route path='/container/all-containers' component={() => this.allContainers()} />
              <Route path='/container/add-new-container' component={() => this.createContainer()} />
              <Route path='/container/select-container' component={() => this.selectContainer()} />
            </Col>
            <Col>

            </Col>
          </Row>

        </container>
      </Router >

    );
  }
}

export default connect(store => store)(App);
