const path = require("path");
const yargs = require("yargs-parser");

const exitWithError = require("./exitWithError");

function validateArgs(args) {
  const { template, target, install, _ } = yargs(args);
  const toInstall = install !== undefined ? install : true;

  if (!target && _.length === 2) exitWithError("Missing --target directory.");

  if (_.length > 3) exitWithError("Unexpected extra arguments.");

  const targetDirectoryRelative = target || _[2];
  const targetDirectory = path.resolve(process.cwd(), targetDirectoryRelative);

  return {
    template: template || "default",
    targetDirectoryRelative,
    targetDirectory,
    toInstall,
  };
}

module.exports = validateArgs;
