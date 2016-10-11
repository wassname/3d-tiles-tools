'use strict';
var fs = require('fs-extra');
var Promise = require('bluebird');
var zlib = require('zlib');
var isGzipped = require('./isGzipped');

var fsReadFile = Promise.promisify(fs.readFile);
var zlibGunzip = Promise.promisify(zlib.gunzip);

/**
 * Reads tileset data from a file.
 *
 * @param {String} filePath The file path to read from.
 * @returns {JSON} A JSON that contains the parsed data in the filePath.
 *
 */
function readTileset(filePath) {
    return fsReadFile(filePath)
        .then(function (buffer) {
            if (isGzipped(buffer)) {
                return zlibGunzip(buffer)
                    .then(function(data) {
                        return JSON.parse(data.toString());
                })
            } else {
                return JSON.parse(buffer.toString());
            }
        });
}