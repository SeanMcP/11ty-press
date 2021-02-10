module.exports = function markdownPlugin(config) {
  const markdownIt = require("markdown-it");
  const mdiOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
  };

  config.setLibrary("md", markdownIt(mdiOptions).disable("code"));
};
