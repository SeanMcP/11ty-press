---
layout: layouts/blog.njk
title: Blog
---

## Posts

{% for post in collections.posts | reverse %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}