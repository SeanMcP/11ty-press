---
layout: layouts/blog.njk
pagination:
  data: collections.tagsAll
  size: 1
  alias: tag
eleventyComputed:
  title: "Tag: {{ tag | capitalize }}"
permalink: /tag/{{ tag }}/
title: "Tag"
---

{% for post in collections[tag] | reverse %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}