---
layout: default
---
{% assign candidate = page %}

<article class="grid">
  {% include page-header.html title=candidate.name %}

  <div class="grid-col-12">
    <div>
      <img style="width: 10rem; border-radius: 5rem;" src="{{ candidate.photo_url | default: 'https://s3-us-west-1.amazonaws.com/odca-candidate-photos/no-image.png' }}" alt="{{ candidate.name }}" />
    </div>
    <div><a href="{{ candidate.website_url }}">{{ candidate.website_url }}</a></div>
    <div><a href="https://twitter.com/{{ candidate.twitter_url }}">{{ candidate.twitter_url }}</a></div>

    {{ candidate.content }}

    <p>Contributions: {{ candidate.total_contributions | money }}</p>
    <p>Expenditures: {{ candidate.total_expenditures | money }}</p>
    <p>Loans: {{ candidate.total_loans_received | money }}</p>
  </div>
</article>
