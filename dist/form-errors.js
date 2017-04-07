'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormErrors = function () {
    /*
     * Create a new FormErrors instance.
     */
    function FormErrors() {
        _classCallCheck(this, FormErrors);

        this.errors = {};
    }

    /*
     * Get all of the raw errors for the collection.
     */


    _createClass(FormErrors, [{
        key: 'all',
        value: function all() {
            return this.errors;
        }

        /*
         * Determine if the collection has any errors.
         */

    }, {
        key: 'hasErrors',
        value: function hasErrors() {
            return !(0, _lodash.isEmpty)(this.errors);
        }

        /*
         * Get all of the errors for the collection in a flat array.
         */

    }, {
        key: 'flatten',
        value: function flatten() {
            return (0, _lodash.flatten)((0, _lodash.toArray)(this.errors));
        }

        /*
         * Forget all of the errors currently in the collection.
         */

    }, {
        key: 'forget',
        value: function forget() {
            this.errors = {};
        }

        /*
         * Get the first error for the given field.
         */

    }, {
        key: 'get',
        value: function get(field) {
            if (this.has(field)) {
                return this.errors[field][0];
            }
        }

        /*
         * Determine if the collection has any errors for the given field.
         */

    }, {
        key: 'has',
        value: function has(field) {
            return (0, _lodash.has)(this.errors, field);
        }

        /*
         * Set the raw errors for the collection.
         */

    }, {
        key: 'set',
        value: function set(errors) {
            if ((typeof errors === 'undefined' ? 'undefined' : _typeof(errors)) === 'object') {
                this.errors = errors;
            } else {
                this.errors = {
                    form: ['Something went wrong. Please try again or contact customer support.']
                };
            }
        }
    }]);

    return FormErrors;
}();

exports.default = FormErrors;