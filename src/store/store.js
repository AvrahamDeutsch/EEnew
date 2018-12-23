import { createStore } from 'redux'
import { getData } from './axios.js'

const state = {
    currentProject: null,
    categories: [],
    arrayResult:[],
    projects: [],
    projectUserStory: [],
    containers: [],
    mileStone: [],
    catalog: [],


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
            var url = `${src}/userStory/allStories/${state.currentProject}`
            getData(url, 'FILL_USER_STORY_BY_SPECIFIC_PROJECT')
            return newState

        case 'FILL_USER_STORY_BY_SPECIFIC_PROJECT':
            newState.projectUserStory = action.payload;
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
           
            
            action.payload.arrayResult.map((component, index) => {
                arr.push({
                    id: component._.id,
                    category: component.category,
                    component: component.component,
                    comlexity: [component.low_complexity, component.med_complexity, component.high_complexity]
                })
            })
            this.setState({ arrayResult: arr });
            console.log(state);
                 return newState
            return newState



    }
    return newState

}
var store = createStore(reduser, state)
export default store
