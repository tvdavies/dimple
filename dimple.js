#!/usr/bin/env node

'use strict';

var fs = require('fs');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var config = require('./dimple.json');

var doCopy = function (sourceDir, targetDir) {
	fs.exists(sourceDir, function (exists) {
		if (exists) {
			fs.exists(targetDir, function (exists) {
				if (exists) {
					rimraf.sync(targetDir);
				}
				// Copy the directory from source to target
				ncp(sourceDir, targetDir, function (err) {
					console.log('Copied ' + sourceDir + ' --> ' + targetDir);
				});
			});
		}
	});
};

for (var group in config) {
	if (config[group].sourceDir.slice(-1) !== '/')
		config[group].sourceDir += '/';

	if (config[group].targetDir.slice(-1) !== '/')
		config[group].targetDir += '/';

	if (!fs.existsSync(config[group].sourceDir))
		// If the source directory does not exist
		// then there's not much we can do but stop.
		process.exit(1);

	if (!fs.existsSync(config[group].targetDir))
		// Target directory does not exist so create it.
		fs.mkdir(config[group].targetDir);

	// Now copy each directory specified in file
	var length = config[group].copyDirs.length;
	for (var i = 0; i < length; i++)
		doCopy(
			config[group].sourceDir + config[group].copyDirs[i],
			config[group].targetDir + config[group].copyDirs[i]
		);
}
