---
title: Admin
---

{% assign sorted_elections = site.data.elections.oakland | sort %}
{% for election_data in sorted_elections reversed %}
  {% assign election_date = election_data[0] %}
  {% include admin/ballot_index.html locality="oakland" election=election_date %}
{% endfor %}

<h2>Elections In Other Jurisdictions</h2>
{% assign sorted_elections = site.data.elections.sf | sort %}
{% for election_data in sorted_elections reversed %}
  {% assign election_date = election_data[0] %}
  {% include admin/ballot_index.html locality="sf" election=election_date %}
{% endfor %}

{% assign sorted_elections = site.data.elections.berkeley | sort %}
{% for election_data in sorted_elections reversed %}
  {% assign election_date = election_data[0] %}
  {% include admin/ballot_index.html locality="berkeley" election=election_date %}
{% endfor %}
