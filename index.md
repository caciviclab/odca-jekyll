---
layout: default
---

<div class="grid">
  <div class="grid-col-12">
    <ul class="list--bulleted">
      {% for locality in site.localities %}
	<li><a href="{{ locality.url | prepend: site.baseurl }}">{{ locality.name }}</a></li>
      {% endfor %}
    </ul>
  </div>
</div>
