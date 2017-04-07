'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var Http = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


    return {
        /*
         * Helper method for submitting a form as a DELETE request.
         */
        deleteForm: function deleteForm(uri, form) {
            return this.sendForm('delete', uri, form);
        },


        /*
         * Helper method for submitting a form as a POST request.
         */
        postForm: function postForm(uri, form) {
            var formData = new FormData();

            (0, _lodash.forIn)(form.fields, function (value, key) {
                if ((0, _helpers.isFile)(value)) {
                    var ext = (0, _helpers.getFileExtension)(value);
                    formData.append(key, value, key + '.' + ext);
                } else {
                    formData.append(key, value);
                }
            });

            return this.sendForm('post', uri, form, formData);
        },


        /*
         * Helper method for submitting a form as a PUT request.
         */
        putForm: function putForm(uri, form) {
            return this.sendForm('put', uri, form);
        },


        /*
         * Helper method for submitting a form.
         */
        sendForm: function sendForm(method, uri, form) {
            var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var submitter = Http ? Http : Vue.http;

            var data = formData ? formData : JSON.parse(JSON.stringify(form.fields));

            return new Promise(function (resolve, reject) {
                form.startProcessing();

                submitter[method](uri, data).then(function (response) {
                    form.finishProcessing();
                    resolve(response.data);
                }).catch(function (errors) {
                    form.setErrors(errors.data);
                    form.busy = false;
                    reject(errors.data);
                });
            });
        }
    };
};

var _lodash = require('lodash');

var _helpers = require('./helpers');