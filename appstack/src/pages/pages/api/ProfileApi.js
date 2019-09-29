const config_api = require("../../../config/config").config_api;
// const ValidInput = require("../../../utils/ValidInput");
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
    // console.log('Bearer ' + JSON.parse(userInfo).token)
    if (username == "" && window.location.search == "")
        ModalAPI({
            url: "http://fwork.tinasoft.com.vn:8000/api/v1/users/me",
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

function modifyUser(data, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    ModalAPI({
        method: 'PATCH',
        url:  config_api.user + '/' + JSON.parse(userInfo).id,
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjo1MH0:1hy5hB:sQcJpn4rCkHazQOZf2O3lpS2Sw0',
        },
        body: {
            "full_name" : data
        }
    }, listMap, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    })
   

}

function upLoadAvatar(photo, listMap, callback) {
    console.log(photo);
    const userInfo = localStorage.getItem('userInfo');
    console.log('Bearer ' + JSON.parse(userInfo).token);
    ModalAPI({
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
    // try {
    //     fetch(config_api.user + '/change_avatar', {
    //         method: 'POST',
    //         headers: {
    //             'authorization': 'Bearer ' + JSON.parse(userInfo).token
    //         },
    //         body: photo
    //     })
    //         .then(res => {
    //             if (res.ok) return res.json();
    //             else throw res;
    //         })
    //         .then(
    //             (result) => {
    //                 return result;
    //             },
    //             (err) =>{
    //                 throw (err.json());
    //             }
    //         )
    //         .then(
    //             (data) => {
    //                 return callback(false,data);
    //             },
    //             (err) => {
    //                 return callback(err);
    //             }
    //         )
    //         .catch(
    //             (err) => {
    //                 return callback(err);
    //             }
    //         )
    // }
    // catch (e) {
    //     return callback(e);
    // }

    

}

function getTimelineProfile(id, page, listMap, callback) {
    const userInfo = localStorage.getItem("userInfo");
    const _id = JSON.parse(localStorage.getItem('userInfo')).id;
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
                let check_enven_type = ["users.user.create", "projects.membership.create", "userstories.userstory.create", "userstories.userstory.change", "tasks.task.create", "tasks.task.change"]
                result.map(({ created, event_type, data }) => {
                    if (check_enven_type.includes(event_type)) {
                    let element = {
                        created: created,
                        event_type: event_type,
                        data: {
                            values_diff: data.values_diff,
                            userstory: data.userstory,
                            task: data.task,
                            user: data.user,
                            project: data.project
                        }
                    };
                    items.push(element)
                }
                });
                return callback(null, items);
            }
        }); 
    else 
        ModalAPI({
            url : config_api.timeline_user + '/' + id + '?only_relevant=true&page=' + page,
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
                let check_enven_type = ["users.user.create", "projects.membership.create", "userstories.userstory.create", "userstories.userstory.change", "tasks.task.create", "tasks.task.change"]
                result.map(({ created, event_type, data }) => {
                    if (check_enven_type.includes(event_type)) {
                    let element = {
                        created: created,
                        event_type: event_type,
                        data: {
                            values_diff: data.values_diff,
                            userstory: data.userstory,
                            task: data.task,
                            user: data.user,
                            project: data.project
                        }
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
    modifyUser: modifyUser,
    upLoadAvatar: upLoadAvatar,
    getTimelineProfile: getTimelineProfile
    // getUserInfo2 : getUserInfo2
};
