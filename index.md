---
layout: default
---

<ul>
{% for locality in site.localities %}
<li><a href="{{ locality.url | prepend: site.baseurl }}">{{ locality.name }}</a></li>
{% endfor %}
</ul>
