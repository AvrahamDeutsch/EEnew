import { createStore } from 'redux'
import { getData, editData } from './axios.js'
import { Alert } from 'reactstrap';


const state = {
    currentProject: null,
    categories: [],
    arrayResult:[],
    projects: [],
    projectUserStory: [],
    containers: [],
    mileStone: [],
    catalog: [],
    addContainerMode:false


}

var src = 'http://10.2.2.103:5000/api'
var categoryPath = 'http://10.2.2.103:8080/app'

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
            var url = `${src}/project/allProjects`
            getData(url, 'FILL_PROJECTS_ARRAY')
            return newState

        case 'FILL_PROJECTS_ARRAY':
            newState.projects = action.payload;
            return newState

        case 'CURRENT_PROJECT':
            newState.projectUserStory = []
            newState.containers = []
            newState.mileStone = []

            newState.currentProject = action.payload;
            // var url = `${src}/userStory/allStories/${state.currentProject}`
            var url = `${src}/userStory/allStories/${action.payload}`
console.log(url , action.payload);
            
            getData(url, 'FILL_USER_STORY_BY_SPECIFIC_PROJECT')
            return newState

        case 'FILL_USER_STORY_BY_SPECIFIC_PROJECT':
        console.log('us=',action.payload);
            action.payload.subjects.map((subject)=>{
                subject.requirements.map((us)=>{
                    newState.projectUserStory.push(us)
                })
            })
            var url = `${src}/effort/allData/${state.currentProject}`
            getData(url, 'FILL_CONTAINERS_FOR_SPECIFIC_PROJECT')
            return newState

        case 'FILL_CONTAINERS_FOR_SPECIFIC_PROJECT':
            newState.mileStone = action.payload.map((ms => {
                newState.mileStone[parseInt(ms.milestoneName)] = ms;
                ms.containers.map(elm => {
                    newState.containers.push(elm)

                })
            }))
        
            case 'CATEGORY_CHANGED':
            var url =`${categoryPath}/find_category/?category=${action.payload}`
            console.log(url);
            
            getData(url,'FILL_COMPONENTS')
            
            return newState
            case 'FILL_COMPONENTS':
            var arr = [];
           
            
            // action.payload.arrayResult.map((component, index) => {
            //     arr.push({
            //         id: component._.id,
            //         category: component.category,
            //         component: component.component,
            //         comlexity: [component.low_complexity, component.med_complexity, component.high_complexity]
            //     })
            // })
            // this.setState({ arrayResult: arr });
            console.log(state);
                 return newState
            return newState
            case 'ADD_NEW_CONTAINER':
            var url =`${src}/effort/createContainer/${state.currentProject}/${action.payload.milestoneName}`
            console.log(url)
            console.log(action.payload)
            state.currentProject != null ?
            
            editData(url, action.payload,'CLEAN_THE_STORE')
            : window.alert('You did not select a project!')
            return newState
           
            case 'CLEAN_THE_STORE':
            // newState.projectUserStory = []
            // newState.containers = []
            // newState.mileStone = []
            return newState
           
            case 'CHANGE_ADD_CONTAINER_MODE':
            newState.addContainerMode = !state.addContainerMode
            return newState


    }
    return newState

}
var store = createStore(reduser, state)
export default store
