/**
 * Inspired by https://github.com/gregives/Twelvety/blob/master/utils/shortcodes/javascript.js
 */

function validateLanguage(language) {
  if (!language) throw Error("Please provide a language");
  if (!["css", "js"].includes(language))
    throw Error("Please provide a valid language");
}

function getTags(language) {
  if (language === "css") return ["<style data-injected>", "</style>"];
  if (language === "js")
    return ['<script data-injected type="module">', "</script>"];
}

module.exports = function (config) {
  let CHUNKS = {};

  config.addPairedShortcode("inline", function (content, language) {
    validateLanguage(language);

    if (!CHUNKS[this.page.url]) CHUNKS[this.page.url] = { css: [], js: [] };

    CHUNKS[this.page.url][language].push(content);

    return "";
  });

  config.addShortcode("injectInline", function (language) {
    validateLanguage(language);

    if (CHUNKS[this.page.url] && CHUNKS[this.page.url][language].length > 0) {
      const [open, close] = getTags(language);
      // TODO: Minify CSS or JS
      const content = CHUNKS[this.page.url][language].join("\n");
      return open + content + close;
    }
    return "";
  });

  config.on("beforeWatch", function () {
    CHUNKS = {};
  });
};
