---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<ul>
{% for locality in site.localities %}
<li><a href="{{ locality.url | prepend: site.baseurl }}">{{ locality.name }}</a></li>
{% endfor %}
</ul>
