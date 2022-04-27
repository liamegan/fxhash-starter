const path = require("path");
const fs = require("fs");
const { removeSync } = require("fs-extra");

module.exports = async function cleanProject(dir) {
  const packageManifest = path.join(dir, "package.json");

  removeSync(path.join(dir, "package-lock.json"));
  removeSync(path.join(dir, "node_modules"));

  const {
    scripts,
    webDependencies,
    dependencies,
    devDependencies,
  } = require(packageManifest);

  const { prepare, start, build, test, ...otherScripts } = scripts;

  await fs.promises.writeFile(
    packageManifest,
    JSON.stringify(
      {
        scripts: { prepare, start, build, test, ...otherScripts },
        webDependencies,
        dependencies,
        devDependencies,
      },
      null,
      2
    )
  );

  await fs.promises.writeFile(
    path.join(dir, ".gitignore"),
    ["build", "node_modules"].join("\n")
  );
};
