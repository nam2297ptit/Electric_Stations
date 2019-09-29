const config_api = require("../../../config/config").config_api;
const ModalAPI = require("../../../controller/ModalAPI").ModalAPI;


/***
 *
 * @param id
 * @param callback
 * @returns {*}
 * result modal
 * [
 * {
 *     id: Number,
 *     version: Number,
 *     name: String,
 *     time: {
 *         created_date: String,
 *         due_date: String
 *     },
 *     member: [Number],
 *     tags: [String],
 *     status: String
 * }
 * ]
 */

function getUserInfo(username, listMap, callback) {
    const userInfo = localStorage.getItem('userInfo');
    if (username == '' && window.location.search == '')
        ModalAPI({
            url: config_api.path+"users/me",
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(userInfo).token
            },
            body: null
        }, listMap, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    else
        ModalAPI({
            url: config_api.user + '/by_username?username=' + username,
            headers: {
                'authorization': 'Bearer ' + JSON.parse(userInfo).token
            },
            body: null
        }, listMap, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
}
function getStats(id, listMap, callback) {
    const userInfo = localStorage.getItem('userInfo');
        ModalAPI({
            url: config_api.user+`/${id}/stats`,
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(userInfo).token
            },
            body: null
        }, listMap, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
}
function getContacts(id, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    ModalAPI({
        url: config_api.user + `/${id}/contacts`,
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + JSON.parse(userInfo).token
        },
        body: null
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
}
function getWatched(id, page, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    ModalAPI({
        url: config_api.user + `/${id}/watched?page=${page}`,
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + JSON.parse(userInfo).token
        },
        body: null
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
}
function getProject(id, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    ModalAPI({
        url: config_api.project + `?member=${id}&order_by=user_order`,
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + JSON.parse(userInfo).token
        },
        body: null
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
}

function updateUserInfo(data, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    ModalAPI({
        method: 'PATCH',
        url:  config_api.user + '/' + JSON.parse(userInfo).id,
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + JSON.parse(userInfo).token
        },
        body: {
            "username" : data.username,
            "full_name" : data.fullname,
            "bio" : data.bio
        }
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
}

const ValidInput = require("../../../utils/ValidInput");
function updateAvatar(photo, listMap, callback) {
    const userInfo = localStorage.getItem('userInfo');
    function _MyModalAPI(req, listMap, callback) {
        fetch(req.url, {
            method: ValidInput.isEmpty(req.method) ? "GET" : req.method,
            headers: ValidInput.isEmpty(req.headers) ? {} : req.headers,
            body: req.body
        })
            .then(res => {
                if (!res.ok) {
                    throw [res.status, res.statusText];
                }
                if(res.statusText==="No Content")
                    return "No Content";
                return res.json()
            })
            .then(
                (result) => {
                    if(result==="No Content"){
                        return callback(null, "No Content");
                    } else {
                        if(ValidInput.isEmpty(listMap)){
                            return callback(null, result);
                        } else {
                            if(Array.isArray(listMap)){
                                let data = [];
                                result.map((result) => {
                                    let element = JSON.parse(JSON.stringify(listMap[0]));
                                    Object.keys(listMap[0]).forEach(key => {
                                        element[key] = result[listMap[0][key]];
                                    });
                                    data.push(element)
                                });
                                return callback(null, data);
                            } else {
                                let data = listMap;
                                Object.keys(listMap).forEach(key => {
                                    data[key] = result[key];
                                });
                                return callback(null, data)
                            }
                        }
                    }
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    if(error[0]!==undefined)
                        return callback(error);
                    else
                        return callback("Failed to fetch")
                }
            )
    }
    _MyModalAPI({
        method: 'POST',
        url: config_api.user + '/change_avatar',
        headers: {
            'authorization': 'Bearer ' + JSON.parse(userInfo).token
        },
        body: photo
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
    // ModalAPI({
    //     method: 'POST',
    //     url: config_api.user + '/change_avatar',
    //     headers: {
    //         'authorization': 'Bearer ' + JSON.parse(userInfo).token
    //     },
    //     body: photo
    // }, listMap, (err, result) => {
    //     if (err) {
    //         return callback(err);
    //     } else {
    //         return callback(null, result);
    //     }
    // })
}

function getTimeline(id, page, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    const _id = JSON.parse(userInfo).id;
    if (id == _id)
        ModalAPI({
            url: config_api.timeline_profile + id + '?page=' + page,
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(userInfo).token
            },
            body: null
        }, listMap, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                console.log(result);
                let items = [];
                let check_enven_type = ["users.user.create", "projects.project.create", "projects.project.change", "projects.membership.create", "userstories.userstory.create", "userstories.userstory.change","userstories.userstory.delete", "tasks.task.create", "tasks.task.change", "issues.issue.create", "issues.issue.change", "wiki.wikipage.create", "wiki.wikipage.change", "wiki.wikipage.delete"]
                result.map(({ created, event_type, data }) => {
                    if (check_enven_type.includes(event_type)) {
                    let element = {
                        created: created,
                        event_type: event_type,
                        data: data,
                    };
                    items.push(element)
                }
                });
                return callback(null, items);
            }
        }); 
    else 
        ModalAPI({
            url : config_api.timeline_user + `/${id}?only_relevant=true&page=${page}`,
            headers : {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(userInfo).token                 
            },
            body : null
        }, listMap, (err, result) => {
            if (err) {
                return callback(err);
            } else {
                let items = [];
                let check_enven_type = ["users.user.create", "projects.project.create", "projects.project.change", "projects.membership.create", "userstories.userstory.create", "userstories.userstory.change","userstories.userstory.delete", "tasks.task.create", "tasks.task.change", "issues.issue.create", "issues.issue.change", "wiki.wikipage.create", "wiki.wikipage.change", "wiki.wikipage.delete"]
                result.map(({ created, event_type, data }) => {
                    if (check_enven_type.includes(event_type)) {
                    let element = {
                        created: created,
                        event_type: event_type,
                        data: data
                    };
                    items.push(element)
                }
                });
                return callback(null, items);
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
