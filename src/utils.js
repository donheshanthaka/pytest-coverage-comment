const fs = require('fs');
const core = require('@actions/core');

const getPathToFile = (pathToFile) => {
  if (!pathToFile) {
    return null;
  }

  // suports absolute path like '/tmp/pytest-coverage.txt'
  return pathToFile.startsWith('/')
    ? pathToFile
    : `${process.env.GITHUB_WORKSPACE}/${pathToFile}`;
};

const getContentFile = (pathToFile) => {
  if (!pathToFile) {
    return null;
  }

  const fileExists = fs.existsSync(pathToFile);

  if (!fileExists) {
    core.warning(`File "${pathToFile}" doesn't exist`);
    return null;
  }

  const content = fs.readFileSync(pathToFile, 'utf8');

  if (!content) {
    core.warning(`No content found in file "${pathToFile}"`);
    return null;
  }

  core.info(`File read successfully "${pathToFile}"`);
  return content;
};

const getContent = (filePath) => {
  try {
    const fullFilePath = getPathToFile(filePath);

    if (fullFilePath) {
      const content = getContentFile(fullFilePath);

      return content;
    }
  } catch (error) {
    core.error(`Could not get content of "${filePath}". ${error.message}`);
  }

  return null;
};

module.exports = { getPathToFile, getContentFile, getContent };
