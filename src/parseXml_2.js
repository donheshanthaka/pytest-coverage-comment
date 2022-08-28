const xml2js = require('xml2js');
const core = require('@actions/core');
const { getContent } = require('./utils');

// return parsed xml
const getParsedXml = (options) => {
  const content = getContent(options.covXmlFile);

  if (content) {
    return getSummary(content);
  }

  return '';
};

// return summary report in markdown format
const getCoverageXmlReport = (options) => {
  try {
    const parsedXml = getParsedXml(options);

    if (parsedXml) {
      // return toMarkdown(parsedXml, options);
      return parsedXml;
    }
  } catch (error) {
    core.error(`Error on generating summary report. ${error.message}`);
  }

  return '';
};

// get summary from coverage xml
const getSummary = (data) => {
  if (!data || !data.length) {
    return null;
  }

  const parser = new xml2js.Parser();

  const parsed = parser.parseString(data);
  if (!parsed) {
    core.warning(`Coverage xml file is not XML or not well formed`);
    return '';
  }

  return parser.resultObject.coverage.testsuite[0]['$'];
};

module.exports = { getCoverageXmlReport };
