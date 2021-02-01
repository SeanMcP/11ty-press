module.exports = (config) => {
  /* ---------- PLUGINS ---------- */
  config.addPlugin(require("@11ty/eleventy-plugin-rss"));
  config.addPlugin(require("./src/_plugins/inline"));
  config.addPlugin(require("./src/_plugins/404"));
  config.addPlugin(require("./src/_plugins/image"));

  /* ---------- SETTINGS ---------- */
  config.addPassthroughCopy({ "src/_appearance/theme/assets/": "assets/" });
  // Reload on sass changes
  config.addWatchTarget("src/_appearance/theme/");
  config.setDataDeepMerge(true);

  /* ---------- FILTERS ---------- */
  config.addFilter("dateToSlug", (date) => {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: "src/",
      includes: "_appearance/"
    },
  };
};
