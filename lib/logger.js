// This is just a simple wrapper around console.log to create standardized logs
const chalk = require("chalk");

// consts
const log = console.log;

const buildMessage = function (icon, message) {
  if (typeof message == "object") message = message.join(" -> ");
  return `${icon}  ${message}`;
};

const logger = {
  announce: function (message) {
    log(chalk.gray(buildMessage("ANNOUNCE ::", message)));
  },
  error: function (message, details) {
    log(chalk.red(buildMessage("ERROR    ::", message)));
    if (details) {
      log(chalk.red("Details:"));
      log(details);
    }
  },
  success: function (message) {
    log(chalk.green(buildMessage("SUCCESS  ::", message)));
  },
  warning: function (message) {
    log(chalk.yellow(buildMessage("WARNING  ::", message)));
  },
  start: function (message) {
    log(chalk.cyan(buildMessage("INITIATED::", message)));
  },
  finish: function (message) {
    log(chalk.magentaBright(buildMessage("COMPLETED::", message)));
  },
};

module.exports = logger;
