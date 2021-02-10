module.exports = (config) => {
  /* ---------- PLUGINS ---------- */
  config.addPlugin(require("@11ty/eleventy-plugin-rss"));
  config.addPlugin(require("./src/_plugins/inline"));
  config.addPlugin(require("./src/_plugins/404"));
  config.addPlugin(require("./src/_plugins/image"));

  /* ---------- SETTINGS ---------- */
  config.addPassthroughCopy({
    "src/_appearance/theme/assets/": "assets/",
    "src/_media/": "assets/images/",
  });
  config.addPassthroughCopy("src/admin/config.yml");
  // Reload on sass changes
  config.addWatchTarget("src/_appearance/theme/");
  config.setDataDeepMerge(true);

  /* ---------- FILTERS ---------- */
  config.addFilter("dateToSlug", (date) => {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  });

  config.addFilter("jsSlice", (array, ...args) => {
    return array.slice(...args);
  });

  config.addFilter("shuffle", (array) => {
    const next = array.slice(0);
    // https://stackoverflow.com/a/12646864
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
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

  // TODO: Find a way to calculate this once
  function getAlphabeticalTags(collectionApi) {
    const posts = collectionApi.getFilteredByTag("posts");
    const count = {};

    posts.forEach((post) => {
      if (!"tags" in post.data) return;

      post.data.tags.forEach((tag) => {
        // Exclude "posts" from list
        if (tag === "posts") return;
        if (!count[tag]) {
          count[tag] = 1;
        } else {
          count[tag]++;
        }
      });
    });

    return { alphabetical: Object.keys(count).sort(), count };
  }

  config.addCollection("tagsAll", (collectionApi) => {
    return getAlphabeticalTags(collectionApi).alphabetical;
  });

  config.addCollection("tagsPopular", (collectionApi) => {
    const { alphabetical, count } = getAlphabeticalTags(collectionApi);

    return alphabetical
      .sort((a, b) => count[b] - count[a])
      .reduce((acc, current) => {
        acc.push([current, count[current]]);
        return acc;
      }, []);
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      data: "_settings/",
      input: "src/",
      includes: "_appearance/",
    },
  };
};
