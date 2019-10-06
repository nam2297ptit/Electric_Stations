const api = require("../../../config/config");
const ModalAPI = require("../../../controller/ModalAPI").ModalAPI;
const utils = require("../../../utils/utils");

function listMemberships(listMap, callback) {
    ModalAPI({
        url: api.config_api.memberships + "?project=" + utils.getProjectId(),
        headers: {
            "Authorization": 'Bearer ' + utils.getAuthToken()
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

function getIdRole(listMap, callback) {
    ModalAPI({
        url: api.config_api.roles + "?project=" + utils.getProjectId(),
        headers: {
            "Authorization": 'Bearer ' + utils.getAuthToken(),
            'x-disable-pagination': 1
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

module.exports = {
    listMemberships: listMemberships,
    getIdRole: getIdRole
}