import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './store/store'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './App.css';
import Container from './components/Container';
import createContainer from './components/createContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // allContainersMound: false,
      addContainerMound:false

    }
  }

  componentDidMount() {
    store.dispatch({ type: 'GET_ALL_CATEGORIES' });
    store.dispatch({ type: 'GET_ALL_PROJECTS' });
  }

  fillProgectsSelect() {
    var arr = []
    this.props.projects.map((project, index) => {
      arr.push(<option key={index} value={project._id}>{project.projectName}</option>)
    })
    return arr
  }

  projectSelected(e) {
    var value = e.target.value;
    store.dispatch({ type: 'CURRENT_PROJECT', payload: value })
  }

  fillContainersSelect() {
    var arr = []
    this.props.containers.map((container, index) => {
      console.log(container);
      arr.push(<option key={index} value={container._id}>{container.containerName}</option>)
    })
    return arr
  }
  containersSelected(e) {



  }
  fillMilestoneSelect() {
    var arr = []
    this.props.mileStone.map((ms, index) => {


      // arr.push(<option  key = {index} value >{ms.milestoneName}</option>)
    })
    return arr
  }

  MilestoneSelected(e) {
    var value = e.target.value;
    console.log(value);

    // store.dispatch({type:'CURRENT_PROJECT', payload: value})
  }
  
createContainer(){
  this.setState({ addContainerMound:!this.state.addContainerMound })
  console.log(this.state);
  
}

  render() {


    return (
      <Form>




        <FormGroup>
          <Label for="exampleSelect">Select project</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.projectSelected(e)}>
            {this.fillProgectsSelect()}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select container</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.containersSelected(e)}>
            {this.fillContainersSelect()}
          </Input>
        </FormGroup>
        
        <Button onClick={()=>this.createContainer()}>Add container</Button>
        <Button onClick={() => this.setState({ allContainersMound: !this.state.allContainersMound })}>All containers</Button>
        {this.state.allContainersMound ? this.props.containers.map((container, index) => {
          return(
          <Container
            name={container.containerName}
            mileStoneNumber={container.milestoneName}
            numberOfTasks ={container.tasks.lengh}
            currentCategory={container.category}
            totalWorkNumber={container.days}
            tasksArray={container.tasks}
            taskContainerUserStory={container.taskContainerUserStory}
          />)
        }) : null}
 {this.state.addContainerMound ? <Container/>:null}
 {/* <Container/>  */}

{/* <Link className='link' to={createContainer}>Create container</Link>
    <Route path={pageLinkes.selectProject} component={SelectProject} /> */}

      </Form>
    );
  }
}

export default connect(store => store)(App);
