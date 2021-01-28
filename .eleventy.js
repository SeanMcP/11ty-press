module.exports = (config) => {
  /* ---------- PLUGINS ---------- */
  config.addPlugin(require("@11ty/eleventy-plugin-rss"));
  config.addPlugin(require('./src/_plugins/inline'))
  config.addPlugin(require('./src/_plugins/404'))

  /* ---------- SETTINGS ---------- */
  config.addPassthroughCopy({ "src/_assets/": "assets/" });
  // Reload on sass changes
  config.addWatchTarget("src/_theme/sass/")
  config.setDataDeepMerge(true);
  
  /* ---------- FILTERS ---------- */
  config.addFilter("dateToSlug", (date) => {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  });

  return {
    dir: {
      input: "src/",
    },
  };
};
