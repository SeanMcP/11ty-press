const path = require("path");
const Image = require("@11ty/eleventy-img");

const urlPattern = /^https?:\/\//;

function buildFilename(src, width, format = "jpeg") {
  const extension = path.extname(src);
  const name = path.basename(src, extension);
  return `${name}-${width}w.${format}`;
}

function getSrc(src) {
  if (urlPattern.test(src)) return src;
  if (src.includes("/src/_media")) return src.slice(1);
  return "src/_media/" + src;
}

module.exports = function (config) {
  config.addFilter("imageUrl", (src, width = 480) => {
    return `/assets/images/${buildFilename(src, width)}`;
  });

  config.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, contextClass, sizes) {
      let metadata = await Image(getSrc(src), {
        filenameFormat: function (_, src, width, format) {
          return buildFilename(src, width, format);
        },
        outputDir: "./_site/assets/images/",
        urlPath: "/assets/images/",
        widths: [480, 960, 1200],
      });

      let imageAttributes = {
        alt,
        class: `eleventy-img${contextClass ? ` ${contextClass}` : ""}`,
        decoding: "async",
        loading: "lazy",
        sizes,
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );
};
