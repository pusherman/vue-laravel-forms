'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormErrors = exports.Form = exports.Http = exports.FormHelpers = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _formErrors = require('./form-errors');

var _formErrors2 = _interopRequireDefault(_formErrors);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormHelpers(Vue) {

    var http = Vue.hasOwnProperty('http') ? Vue.http : null;
    var formHelper = new _http2.default(http);

    Object.defineProperty(Vue.prototype, '$forms', {
        get: function get() {
            return {
                /*
                 * Create a new Form instance.
                 */
                create: function create(fields) {
                    return new _form2.default(fields);
                },


                /*
                 * Create a new FormErrors instance.
                 */
                errors: function errors() {
                    return new _formErrors2.default();
                },


                /*
                 * Submit the given Form to the given URI via a DELETE request.
                 */
                delete: function _delete(uri, form) {
                    return formHelper.deleteForm(uri, form);
                },


                /*
                 * Submit the given Form to the given URI via a POST request.
                 */
                post: function post(uri, form) {
                    return formHelper.postForm(uri, form);
                },


                /*
                 * Submit the given Form to the given URI via a PUT request
                 */
                put: function put(uri, form) {
                    return formHelper.putForm(uri, form);
                },


                /*
                 * Submit the given Form to the given URI using the given HTTP method.
                 */
                submit: function submit(method, uri, form) {
                    var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

                    return formHelper.sendForm(method, uri, form, formData);
                }
            };
        }
    });

    Vue.mixin({

        /*
         * The 'beforeCreate' life-cycle hook for Vue 2.0.
         */
        beforeCreate: function beforeCreate() {
            registerForms(this);
        },


        /*
         * The 'init' life-cycle hook for Vue 1.0.
         */
        init: function init() {
            registerForms(this);
        }
    });
}

/*
 * Register the forms in the forms option.
 */
function registerForms(vm) {
    var forms = vm.$options.forms;

    if ((typeof forms === 'undefined' ? 'undefined' : _typeof(forms)) == 'object') {
        var dataIsFunction = typeof vm.$options.data == 'function';
        var data = dataIsFunction ? vm.$options.data() : vm.$options.data;

        if (typeof data == 'undefined') {
            data = {};
        }

        for (var form in forms) {
            if ((0, _lodash.has)(data, form)) {
                throw new Error('The form, ' + form + ', has a name which is colliding with another form or data property!');
            }
            data[form] = new _form2.default(forms[form]);
        }

        vm.$options.data = function () {
            return data;
        };
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FormHelpers);
}

exports.FormHelpers = FormHelpers;
exports.Http = _http2.default;
exports.Form = _form2.default;
exports.FormErrors = _formErrors2.default;