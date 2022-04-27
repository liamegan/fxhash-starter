#!/usr/bin/env node
// The purpose os this command is to bootstrap a project from a template that will be
"use strict";

const fs = require("fs");
const path = require("path");
const execa = require("execa");
const { copy, remove } = require("fs-extra");
const chalk = require("chalk");
const { logger } = require("@wethegit/sweet-potato-utensils");

const validateArgs = require("../lib/validateArgs");
const getRepoInfo = require("../lib/getRepoInfo");
const cleanProject = require("../lib/cleanProject");
const installProcess = require("../lib/installProcess");
const pkg = require("../package.json");

const exitWithError = require("../lib/exitWithError");

const {
  template,
  toInstall,
  targetDirectoryRelative,
  targetDirectory,
} = validateArgs(process.argv);

let installer = "npm";

const baseTemplatesDir = path.join(__dirname, "..", "templates");
const listOfBaseTemplates = fs
  .readdirSync(path.join(__dirname, "..", "templates"))
  .map((name) => path.join(baseTemplatesDir, name))
  .filter((file) => fs.lstatSync(file).isDirectory());

const isBaseTemplate = listOfBaseTemplates.find((file) => {
  const { name } = path.parse(file);
  return name === template;
});

(async () => {
  logger.announce(`fxhash-starter v${pkg.version}`);
  logger.start("Architecting new project");
  logger.announce(`Creating a new project in ${chalk.cyan(targetDirectory)}`);
  logger.announce(`Using template ${chalk.cyan(template)}`);
  // fetch from npm or GitHub if not local (which will be most of the time)
  if (!isBaseTemplate) {
    const templateInfo = await getRepoInfo(template);

    try {
      // creates the project directory with a temp directory
      const tempPath = path.join(targetDirectoryRelative, "temp");
      fs.mkdirSync(tempPath, { recursive: true });

      // clone template
      // only the specified branch and nothing else
      await execa(
        "git",
        [
          "clone",
          "--single-branch",
          "--branch",
          templateInfo.branch,
          `git@github.com:${templateInfo.username}/${templateInfo.name}.git`,
          tempPath,
        ],
        {
          all: true,
        }
      );

      // remove the .git from the cloned template
      await remove(path.join(tempPath, ".git"));

      // copy everything to the main directory
      await copy(tempPath, targetDirectory);

      // deletes temp path
      await remove(tempPath);
    } catch (err) {
      // Only log output if the command failed
      exitWithError("Failed to clone template", err);
    }
  } else {
    // creates project directory
    fs.mkdirSync(targetDirectoryRelative, { recursive: true });

    // copy base template
    await copy(isBaseTemplate, targetDirectory);

    // deletes and append necessary packages
    await cleanProject(targetDirectory);
  }

  if (toInstall) {
    logger.announce(
      `Installing package dependencies. This might take a couple of minutes.\n`
    );

    try {
      const npmInstallProcess = installProcess(installer, {
        cwd: targetDirectory,
        stdio: "inherit",
      });

      npmInstallProcess.stdout && npmInstallProcess.stdout.pipe(process.stdout);
      npmInstallProcess.stderr && npmInstallProcess.stderr.pipe(process.stderr);

      await npmInstallProcess;

      logger.success("Packages installed");
    } catch (err) {
      exitWithError("Failed to installe packages", err);
    }
  } else logger.announce(`Skipping "${installer} install" step`);

  // builds competion message
  const formatCommand = function (command, description) {
    return "  " + command.padEnd(17) + chalk.dim(description);
  };

  logger.finish("Project peeled 🍠");
  console.log(``);

  // quick help message
  console.log(chalk.bold.underline(`Quickstart:`));
  console.log(`  cd ${targetDirectoryRelative}`);
  if (!toInstall) console.log(`  ${installer} install`);
  console.log(`  ${installer} start`);

  console.log(``);

  console.log(chalk.bold.underline(`All Commands:`));
  console.log(
    formatCommand(`${installer} start`, "Start your development server.")
  );
  console.log(
    formatCommand(
      `${installer} run build`,
      "Build your website for production."
    )
  );
  console.log(``);
})();
