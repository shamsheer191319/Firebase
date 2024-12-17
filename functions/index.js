
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const authHandlers = require("./auth");
const taskHandlers = require("./tasks");

admin.initializeApp();

exports.registerUser = authHandlers.registerUser;
exports.loginUser = authHandlers.loginUser;
exports.createTask = taskHandlers.createTask;
exports.getTasks = taskHandlers.getTasks;
exports.updateTask = taskHandlers.updateTask;
exports.deleteTask = taskHandlers.deleteTask;
exports.dailySummary = taskHandlers.dailySummary;





