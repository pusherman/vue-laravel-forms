'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getFileExtension(file) {
    return file.name.substr(file.name.lastIndexOf('.') + 1);
}

function isFile(field) {
    return Boolean(field) && Boolean(field.size);
}

exports.getFileExtension = getFileExtension;
exports.isFile = isFile;