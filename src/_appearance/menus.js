// Optional: Makes reusing links in multiple menus easier
const LINKS = {
  about: {
    label: "About",
    url: "/about/",
  },
  blog: {
    label: "Blog",
    url: "/blog/",
  },
  home: {
    label: "Home",
    url: "/",
  },
};

// Add as many menus as you wish.
// The data will be available in templates as `menu.primary`.
module.exports = {
  primary: [LINKS.blog, LINKS.about],
  secondary: [LINKS.home, LINKS.blog, LINKS.about],
};
