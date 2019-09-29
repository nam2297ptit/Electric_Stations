const api = require("../../../config/config");
const ClientsApi = require("../../pages/api/clientsApi")
const ModalAPI = require("../../../controller/ModalAPI").ModalAPI;
const utils = require("../../../utils/utils");
const axios = require('axios');

function getListMemberships(callback) {
    axios({
        url: "http://uy-private-server.tinasoft.com.vn:8001/api/v1/users",
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
    .then(result => {
        return callback(false,  result.data)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response);
            
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}
function getIdRole(callback) {
    axios({
        url: "http://uy-private-server.tinasoft.com.vn:8001/api/v1/information",
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
    .then(result => {
        return callback(false,  result.data)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response);
            
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}

// function getMemberSuggestions(listMap, callback) {
//     const project = utils.getProjectId();
//     const userToken = utils.getAuthToken();
//     ModalAPI({
//         url: api.config_api.user + "/" +  utils.getAuthId() + "/contacts?exclude_project=" + project,
//         headers: {
//             "Authorization": 'Bearer ' + userToken
//         },
//         body: null
//     }, listMap, (err, result) => {
//         if (err) {
//             return callback(err);
//         } else {
//             return callback(null,result);
//         }
//     })
// }
function editIsAdmin(dataInput,callback) {
    axios({
        url: "http://uy-private-server.tinasoft.com.vn:8001/api/v1/users/" + dataInput.idMemberChange,
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            "is_admin": dataInput.value
        }
    })
    .then(result => {
        return callback(false,  result.data)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response);
            
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}

// function createMember(listMap,dataInput,callback)  {
//     const project = utils.getProjectId();
//     const userToken = utils.getAuthToken();
//     ModalAPI({
//         url: api.config_api.memberships,
//         method: 'POST',
//         headers: {
//             "Authorization": 'Bearer ' + userToken,
//             "Content-Type": "application/json",
//             "Accept":"application/json"
//         },
//         body: {
//             "project" : project,
//             "role": dataInput.role,
//             "username": dataInput.username
//         }
//     }, listMap, (err, result) => {
//         if (err) {
//             return callback(err);
//         } else {
//             return callback(null,result);
//         }
//     })
// }

// function deleteMembership(listMap,dataInput,callback)  {
//     const userToken = utils.getAuthToken();
//     ModalAPI({
//         url: api.config_api.memberships + "/" + dataInput,
//         method: 'DELETE',
//         headers: {
//             "Authorization": 'Bearer ' + userToken,
//             "Content-Type": "application/json",
//             "Accept":"application/json"
//         },
//         body: null
//     }, listMap, (err, result) => {
//         if (err) {
//             return callback(err);
//         } else {
//             return callback(null,result);
//         }
//     })
// }

// function editIsAdmin(listMap,dataInput,callback)  {
//     const userToken = utils.getAuthToken();
//     ModalAPI({
//         url: api.config_api.memberships + "/" + dataInput.idMemberChange,
//         method: 'PATCH',
//         headers: {
//             "Authorization": 'Bearer ' + userToken,
//             "Content-Type": "application/json",
//         },
//         body: {
//             "is_admin" : dataInput.value
//         }
//     }, listMap, (err, result) => {
//         if (err) {
//             return callback(err);
//         } else {
//             return callback(null,result.is_admin);
//         }
//     })
// }

function editRole(dataInput,callback)  {
    axios({
        url: "http://uy-private-server.tinasoft.com.vn:8001/api/v1/app_substation",
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            "sub_id": dataInput.substations
        }
    })
    .then(result => {
        return callback(false,  result.data)
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response);
            
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}



module.exports = {
    getListMemberships: getListMemberships,
    // deleteMembership: deleteMembership,
    getIdRole: getIdRole,
    editIsAdmin: editIsAdmin,
    editRole: editRole,
    // getMemberSuggestions: getMemberSuggestions,
    // createMember: createMember
}