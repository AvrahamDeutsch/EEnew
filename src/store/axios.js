import axios from 'axios'
import store from './store.js'

export var getData = (url, type) => {
    axios.get(url)
        .then(function (res) {
            // console.log(res.data);
            store.dispatch({ type: type, payload: res.data })
        })
}

export var editData = (url, data, type) => {
    console.log(data);

    axios.put(url, data)
        .then(function (res) {
            // console.log(res);
            store.dispatch({ type: type });
        });
}

export var saveData = (url, data, type) => {
    console.log(data);

    axios.put(url, data)
        .then(function (res) {
            // console.log(res);
            store.dispatch({ type: type });
        });
}


export var deleteData = (url, type) => {
    axios.delete(url)
    .then(function(res) {
        // console.log(res);
        store.dispatch({type: type});
    });
}