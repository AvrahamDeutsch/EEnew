import axios from 'axios'
import store from './store.js'

export var getData = (url, type) =>{
    axios.get(url)
        .then(function(res) {
            console.log(res.data);
            store.dispatch({type: type, payload : res.data})
        })
    }


