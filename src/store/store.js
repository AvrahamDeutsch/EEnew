import { createStore } from 'redux'
import { getData, editData, saveData, deleteData } from './axios.js'


const state = {
    currentProject: null,
    // currentProject: {

    // },
    categories: [],
    // arrayResult: [],
    projects: [],
    projectUserStory: [],
    containers: [],
    mileStone: [],
}

var src = 'http://10.2.3.128:5000/api'
var categoryPath = 'http://10.2.3.128:8080/app'

const reduser = function (state, action) {
    var newState = { ...state }

    switch (action.type) {

        case 'GET_ALL_CATEGORIES':
            var url = `${categoryPath}/category_value_list`
            getData(url, 'FILL_CATEGORIES_ARRAY')
            return newState

        case 'FILL_CATEGORIES_ARRAY':
            // console.log(action.payload.arrayResult);
            newState.categories = action.payload.arrayResult;
            return newState

        case 'GET_ALL_PROJECTS':
            var urlGetAll = `${src}/project/allProjects`
            getData(urlGetAll, 'FILL_PROJECTS_ARRAY')
            return newState

        case 'FILL_PROJECTS_ARRAY':
            newState.projects = action.payload;
            return newState

        case 'CURRENT_PROJECT':
            newState.mileStone = []
            newState.currentProject = action.payload;
            var urlCurentProject = `${src}/userStory/allUserStories/${action.payload}`
            getData(urlCurentProject, 'FILL_USER_STORY_BY_SPECIFIC_PROJECT')
            return newState

        case 'FILL_USER_STORY_BY_SPECIFIC_PROJECT':
            newState.projectUserStory = action.payload
            
            
            var urlUserStory = `${src}/effort/processes/${state.currentProject}`
            getData(urlUserStory, 'FILL_CONTAINERS_FOR_SPECIFIC_PROJECT')
            return newState

        /* this function filling the containers array in the state and
        check for evry user story how many tasks exist  */
        case 'FILL_CONTAINERS_FOR_SPECIFIC_PROJECT':
            newState.containers = [];
            newState.mileStone = [];
            console.log('action', action.payload);
            newState.mileStone = action.payload.map((ms => {
                if (ms != null) {
                    newState.mileStone[parseInt(ms.milestoneName)] = ms;
                    ms.containers.map(elm => {
                        return newState.containers.push(elm)
                    })
                } else {
                    return null
                }
                // console.log(newState.mileStone, ' => ', newState.containers);
            }))
            return newState

        case 'CHANGE_ADD_CONTAINER_MODE':
            newState.addContainerMode = !newState.addContainerMode;
            return newState

        case 'ADD_NEW_CONTAINER':
            var urlAddNewContainer = `${src}/effort/createContainer/${state.currentProject}/${action.payload.mileStoneNumber}`
            // console.log(action.payload)
            state.currentProject != null ?
                editData(urlAddNewContainer, action.payload, 'UPDATE_CURRENT_PROJECT')
                : window.alert('You did not select a project!')
            return newState

        case 'EDIT_CONTAINER':
            var urlEditContainer = `${src}/effort/editContainer/${state.currentProject}/${action.payload.mileStoneNumber}/${action.payload.containerId}`
            console.log(urlEditContainer);
            editData(urlEditContainer, action.payload, 'UPDATE_CURRENT_PROJECT')
            return newState;

        case 'DELETE_CONTAINER':
            var urlDeleteContainer = `${src}/effort/deleteContainer/${state.currentProject}/${action.payload.mileStoneNumber}/${action.payload.containerId}`;
            deleteData(urlDeleteContainer, { type: 'UPDATE_CURRENT_PROJECT', payload: state.currentProject });
            return newState;

        case 'UPDATE_CURRENT_PROJECT':
            var urlCurentProject = `${src}/userStory/allUserStories/${state.currentProject}`;
            // getData(urlCurentProject, 'FILL_CONTAINERS_FOR_SPECIFIC_PROJECT');
            getData(urlCurentProject, 'FILL_USER_STORY_BY_SPECIFIC_PROJECT');
            return newState;

        case 'ADD_TASK':
            // console.log(action.payload);
            var mileStone = action.payload.mileStoneNumber
            var containerId = action.payload.containerId
            var urlAddTask = `${src}/effort/addTask/${state.currentProject}/${mileStone}/${containerId}`;
            saveData(urlAddTask, action.payload, 'UPDATE_CURRENT_PROJECT')
            return newState

        case 'CHANGE_TASK':
            // console.log(action.payload);
            var mileStone = action.payload.mileStoneNumber
            var containerId = action.payload.containerId
            var index = action.payload.taskIndex
            var urlChangeTask = `${src}/effort/changeTask/${state.currentProject}/${mileStone}/${containerId}/${index}`;
            editData(urlChangeTask, action.payload, 'UPDATE_CURRENT_PROJECT')
            return newState

        case 'DELETE_TASK':
            // console.log(action.payload);
            var mileStone = action.payload.mileStoneNumber
            var containerId = action.payload.containerId
            var index = action.payload.taskIndex
            var urlDeleteTask = `${src}/effort/deleteTask/${state.currentProject}/${mileStone}/${containerId}/${index}`;
            deleteData(urlDeleteTask, { type: 'UPDATE_CURRENT_PROJECT', payload: state.currentProject })
            return newState

        default:
        // return newState

    }
    return newState

}

var store = createStore(reduser, state)
export default store
