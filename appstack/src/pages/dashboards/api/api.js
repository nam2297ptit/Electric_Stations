const config_api =  require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function getData(callback) {
    axios({
        url: config_api.data +  "/" + utils.getStationInfo().sub_id,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
    .then(result => {
        console.log(result);
        
        return callback(false,  result.data)
    })
    .catch(error => {
        console.log(error);
        
        if (error.response) {
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}


// function createWork(data, callback){
//     axios({
//         url: "http://uy-private-server.tinasoft.com.vn:3001/api/v1/works",
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": "Bearer " + utils.getAuthToken()
//         },
//         data: {
//             "project": utils.getProjectId(),
//             "subject": data.subject,
//             "description": data.description,
//             "assigned_users": data.assigned_users,
//             "due_date": data.due_date,
//             "tags": data.tags,
//             "status": data.status
//         }
//     })
//     .then(result => {
//         return callback(false,  result.data)
//     })
//     .catch(error => {
//         if (error.response) {
//             return callback(error.response)
//         } else if (error.request) {
//             return callback("Please check your internet connection to server");
//         } else {
//             return callback(error.message) 
//         }
//     });
// }

// function modifyWork(id, data, callback){  
//     console.log(data);
      
//     axios({
//         url: "http://uy-private-server.tinasoft.com.vn:3001/api/v1/works/" + id,
//         method: 'PATCH',
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": "Bearer " + utils.getAuthToken()
//         },
//         data: {
//             "project": utils.getProjectId(),
//             "subject": data.subject,
//             "description": data.description,
//             "version": 1,
//             "assigned_users": data.assigned_users,
//             "due_date": data.due_date,
//             "tags": data.tags,
//             // "status": data.status
//         }
    
//     })
//     .then(result => {
//         return callback(false,  result.data)
//     })
//     .catch(error => {
//         if (error.response) { 
//             console.log(error.response);
            
//             return callback(error.response)
//         } else if (error.request) {
//             return callback("Please check your internet connection to server");
//         } else {
//             return callback(error.message) 
//         }
//     });
// }


module.exports = {
    getData: getData
    // removeWork: removeWork,
    // createWork: createWork,
    // modifyWork: modifyWork
};