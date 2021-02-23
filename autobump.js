const fs = require("fs");
const { execSync } = require("child_process");

const package = require("./package.json");
const packageName = package.name;
console.log("Package name inferred from package.json:", packageName);

const majorVersion = getCurrentMajorVersion();
const newVersion = `${majorVersion + 1}.0.0`;
overwritePackageJsonWithVersion(newVersion);

function getCurrentMajorVersion() {
  const command = `npm info ${packageName} --json`;
  const output = execSync(command).toString();
  const version = JSON.parse(output).version;
  console.log("Latest version:", version);
  const majorVersion = parseInt(version.split(".")[0]);

  return majorVersion;
}

function overwritePackageJsonWithVersion(version) {
  package.version = version;

  const newPackageJson = JSON.stringify(package, null, 2);

  process.stdout.write(`::set-output name=version::${version}`);
  fs.writeFileSync("./package.json", newPackageJson);
}
