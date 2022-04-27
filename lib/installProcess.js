const execa = require("execa");

module.exports = function installProcess(packageManager, installOptions) {
  switch (packageManager) {
    case "npm":
      return execa("npm", ["install", "--loglevel", "error"], installOptions);
    case "yarn":
      return execa("yarn", ["--silent"], installOptions);
    case "pnpm":
      return execa("pnpm", ["install", "--reporter=silent"], installOptions);
    default:
      throw new Error("Unspecified package installer.");
  }
};
