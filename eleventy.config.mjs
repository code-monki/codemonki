import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addFilter("groupByYear", function (posts) {
    const groups = {};
    for (const post of posts) {
      const year = new Date(post.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    }
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map((year) => ({ year, posts: groups[year] }));
  });

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDateString", function (dateObj) {
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  eleventyConfig.setServerOptions({
    domDiff: false,
  });

  eleventyConfig.setWatchThrottleWaitTime(0);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
