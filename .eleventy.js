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

  /* ---------- COLLECTIONS ---------- */
  config.addCollection("postsByDate", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("posts");
    const postsByDate = {};
    const monthMap = {};

    posts.forEach((post) => {
      const postDate = new Date(post.date),
        year = postDate.getFullYear(),
        month = postDate.getMonth(),
        longMonth = postDate.toLocaleString("default", { month: "long" });

      if (!monthMap[month]) monthMap[month] = longMonth;

      if (!postsByDate[year]) postsByDate[year] = {};
      if (!postsByDate[year][month]) postsByDate[year][month] = [];
      postsByDate[year][month].push(post);
    });

    for (const year in postsByDate) {
      for (const numericMonth in postsByDate[year]) {
        const longMonth = monthMap[numericMonth];
        postsByDate[year][longMonth] = postsByDate[year][numericMonth];
        delete postsByDate[year][numericMonth];
      }
    }

    return postsByDate;
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src/",
      includes: "_appearance/",
    },
  };
};
