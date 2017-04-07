'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formErrors = require('./form-errors');

var _formErrors2 = _interopRequireDefault(_formErrors);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
    /*
     * Create a new Form instance.
     */
    function Form(fields) {
        _classCallCheck(this, Form);

        this.busy = false;
        this.errors = new _formErrors2.default();
        this.initialFields = fields;
        this.successful = false;
        (0, _lodash.assignIn)(this, fields);
    }

    /*
     * Get the form's fields.
     */


    _createClass(Form, [{
        key: 'fieldClass',


        /*
         * Get the html/css class for the given field.
         */
        value: function fieldClass(field) {
            var defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var errorClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            var defaultClassString = typeof defaultClass == 'function' ? defaultClass(field) : defaultClass;
            var errorClassString = typeof errorClass == 'function' ? errorClass(field) : errorClass;

            return this.errors.has(field) ? defaultClassString + ' ' + errorClassString : defaultClassString;
        }

        /*
         * Finish processing the form.
         */

    }, {
        key: 'finishProcessing',
        value: function finishProcessing() {
            this.busy = false;
            this.successful = true;
        }

        /*
         * Completely reset the form.
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.resetFields();
            this.resetStatus();
        }

        /*
         * Reset the fields to their initial state..
         */

    }, {
        key: 'resetFields',
        value: function resetFields() {
            var _this = this;

            (0, _lodash.keys)(this.initialFields).forEach(function (key) {
                return _this[key] = _this.initialFields[key];
            });
        }

        /*
         * Reset the errors and other state for the form.
         */

    }, {
        key: 'resetStatus',
        value: function resetStatus() {
            this.busy = false;
            this.errors.forget();
            this.successful = false;
        }

        /*
         * Set the errors on the form.
         */

    }, {
        key: 'setErrors',
        value: function setErrors(errors) {
            this.busy = false;
            this.errors.set(errors);
        }

        /*
         * Start processing the form.
         */

    }, {
        key: 'startProcessing',
        value: function startProcessing() {
            this.errors.forget();
            this.busy = true;
            this.successful = false;
        }
    }, {
        key: 'fields',
        get: function get() {
            var fields = (0, _lodash.pick)(this, (0, _lodash.keys)(this.initialFields));

            // Here we unset null fields.
            (0, _lodash.forIn)(fields, function (value, key) {
                if (value == null) {
                    delete fields[key];
                }
            });

            return fields;
        }
    }]);

    return Form;
}();

exports.default = Form;