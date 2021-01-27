module.exports = (config) => {
  config.addPlugin(require("@11ty/eleventy-plugin-rss"));
  // Settings
  config.addPassthroughCopy({ "src/_assets/": "assets/" });
  config.setDataDeepMerge(true);

  // Filters
  config.addFilter("getDateFromISO", (date) => {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  });

  return {
    dir: {
      input: "src/",
    },
  };
};
