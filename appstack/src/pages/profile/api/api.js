const config_api = require("../../../config/config").config_api;
const ModalAPI = require("../../../controller/ModalAPI").ModalAPI;
const {getAuthToken, getUserId} = require("../../../utils/utils")
const {getObjectValueSameKey} = require("../../../utils/utils")
const newapi = 'http://uy-private-server.tinasoft.com.vn:8001/api/v1/'
const axios = require('axios');

function ModalAPI_(url,method,contentType,data,callback){
    axios({
        url: url,
        method: method,
        headers: {
            'content-type':contentType,
            'authorization':'Bearer ' + getAuthToken()
        },
        data: data
    }).then(result => {
        return callback(false, result.data)
    }).catch(error => {
        if (error.response) {
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message) 
        }
    });
}
function getUserInfo(email, callback) {
    if (email === '' && window.location.search === '')
        ModalAPI_(config_api.path+'users/me', 'GET', 'application/json', null, (err,result)=>{
                if(err) {return callback(err)}
                else {return callback(null, result)}
            }
        )
    else
        ModalAPI_(config_api.path+'users?email='+email, 'GET', 'application/json', null, (err, result) => {
                if (err) {return callback(err)}
                else {return callback(null, result[0])}
            }
        )
}
function getStats(id, callback) {
        ModalAPI({
            url: config_api.user+`/${id}/stats`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + getAuthToken()
            },
            body: null
        }, null, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
}
function getContacts(id, callback) {
    ModalAPI_(config_api.path+'users', 'GET', 'application/json', null, (err, result) => {
        if (err) {return callback(err)}
        else {return callback(null, result)}
    }
)
}
function getWatched(id, page, callback) {
    ModalAPI({
        url: config_api.user + `/${id}/watched?page=${page}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + getAuthToken()
        },
        body: null
    }, [getObjectValueSameKey(['type', 'name', 'assigned_to_extra_info', 'logo_small_url', 'project_name', 'status_color', 'status', 'is_private', 'ref', 'project_slug', 'subject', 'description', 'total_watchers'])], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
}
function getProject(callback) {
    ModalAPI_(config_api.project, 'GET', 'application/json', null, (err, result) => {
            if (err) {return callback(err)}
            else {return callback(null, result)}
        }
    )
}

function updateUserInfo(data, callback) {
    ModalAPI_(config_api.path+'users/'+getUserId(), 'PATCH', 'application/json', data, (err, result) => {
            if (err) {return callback(err)}
            else {return callback(null, result)}
        }
    )
    // ModalAPI({
    //     url:  newapi + '/users/' + JSON.parse(localStorage.getItem("userInfo")).id,
    //     method: 'PATCH',
    //     headers: {
    //         'content-type': 'application/json',
    //         'authorization': 'Bearer ' + getAuthToken()
    //     },
    //     body: {
    //         "username" : data.username,
    //         "full_name" : data.fullname,
    //         "bio" : data.bio
    //     }
    // }, null, (err, result) => {
    //     if (err) {
    //         return callback(err);
    //     } else {
    //         return callback(null, result);
    //     }
    // })
}

function updateAvatar(photo, callback) {
    ModalAPI_(config_api.path+'users/change_avatar', 'POST', 'multipart/form-data', {'avatar':photo}, (err, result) => {
            if (err) {return callback(err)}
            else {return callback(null, result)}
        }
    )
}

function getTimeline(id, page, callback) {
    if (id === JSON.parse(localStorage.getItem("userInfo")).id)
        ModalAPI({
            url: config_api.timeline_profile + id + '?page=' + page,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + getAuthToken()
            },
            body: null
        }, [getObjectValueSameKey(['created','event_type','data','id'])], (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        }); 
    else 
        ModalAPI({
            url : config_api.timeline_user + `/${id}?only_relevant=true&page=${page}`,
            method: 'GET',
            headers : {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + getAuthToken()                 
            },
            body : null
        }, [getObjectValueSameKey(['created','event_type','data','id'])], (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
}
module.exports = {
    getUserInfo: getUserInfo,
    getStats: getStats,
    getContacts: getContacts,
    getWatched: getWatched,
    getProject: getProject,
    updateUserInfo: updateUserInfo,
    updateAvatar: updateAvatar,
    getTimeline: getTimeline,
};
