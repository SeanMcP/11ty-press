## Posts

{% for post in collections.posts %}
- [{{ post.fileSlug }}]({{ post.url }})
{% endfor %}