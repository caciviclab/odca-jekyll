---
title: Admin
---

{% assign sorted_elections = site.data.elections.oakland | sort %}
{% for election_data in sorted_elections reversed %}
  {% assign election_date = election_data[0] %}
  {% include admin/ballot_index.html locality="oakland" election=election_date %}
{% endfor %}
