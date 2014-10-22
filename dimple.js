#!/usr/bin/env node

'use strict';

var fs = require('fs');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var colors = require('colors');

try {
	var config = require('./dimple.json');
} catch (e) {
	console.log('Could not locate \'dimple.json\''.bold.red);
}

function doCopy(sourceDir, targetDir) {
	fs.stat(sourceDir, function (err, stats) {
		if (err === null) {
			if (stats.isDirectory()) {
				fs.exists(targetDir, function (exists) {
					// If the target directory already exists, remove it
					if (exists)
						rimraf.sync(targetDir);

					// Copy the directory from source to target
					console.log(('Copying ' + sourceDir + ' --> ' + targetDir).bold.blue);
					ncp(sourceDir, targetDir, function (err) {
						if (err)
							console.log(('Failed to copy ' + sourceDir + ' --> ' + targetDir).bold.red);
						else
							console.log(('Copied ' + sourceDir + ' --> ' + targetDir).bold.green);
					});
				});
			}
		} else {
			console.log(('Directory \'' + sourceDir + '\' does not exist').bold.red);
		}
	});
}

for (var group in config) {
	if (config[group].sourceDir.slice(-1) !== '/')
		config[group].sourceDir += '/';

	if (config[group].targetDir.slice(-1) !== '/')
		config[group].targetDir += '/';

	// Check directories exist
	(function (group) {
		fs.exists(config[group].sourceDir, function (exists) {
			if (exists) {
				fs.exists(config[group].targetDir, function (exists) {
					var dirsToCopy = [];

					if (typeof config[group].copyDirs === 'string' && config[group].copyDirs === '*') {
						// Get all subdirectories in source folder
						dirsToCopy = fs.readdirSync(config[group].sourceDir);
					} else if (Object.prototype.toString.call(config[group].copyDirs) === '[object Array]') {
						dirsToCopy = config[group].copyDirs;
					} else {
						// Invalid copyDirs
						console.log('Invalid value for \'copyDirs\'. Must be \'*\' or array containing subdirectory names.'.bold.red);
					}

					if (dirsToCopy.length > 0) {
						var copyDirs = function () {
							// Now copy each directory specified in file
							var length = dirsToCopy.length;
							for (var i = 0; i < length; i++) {
								doCopy(
									config[group].sourceDir + dirsToCopy[i],
									config[group].targetDir + dirsToCopy[i]
								);
							}
						};

						// If target directory does not exist, create it
						if (!exists)
							fs.mkdir(config[group].targetDir, copyDirs);
						else
							copyDirs();
					}
				});
			} else {
				// If the source directory does not exist
				// then there's not much we can do but stop.
				console.log(('Directory \'' + config[group].sourceDir + '\' does not exist').bold.red);
			}
		});
	})(group);
}
