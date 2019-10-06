const config_api = require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function createProject(data, callback) {
    console.log(data);

    axios({
        url: config_api.project,
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            name: data.name,
            manager: data.manager,
            sub_id: data.sub_id,
            location: {
                longitude: data.location.longitude,
                latitude: data.location.latitude
            }
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getInfoProjectAll(callback) {
    axios({
        url: config_api.project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getInfoProject(id, callback) {
    /* Check valid input */
    let id_project;
    if (id === "this") {
        id_project = utils.getProjectId();
    } else {
        id_project = id;
    }

    axios({
        url: config_api.project + "/" + id_project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

module.exports = {
    getInfoProjectAll: getInfoProjectAll,
    getInfoProject: getInfoProject,
    createProject: createProject,
}