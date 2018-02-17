---
layout: default
---
{% assign candidate = page %}

<h1>{{ candidate.name }}</h1>
<section>
  <div>
    <img style="width: 10rem; border-radius: 5rem;" src="{{ candidate.photo_url | default: 'https://s3-us-west-1.amazonaws.com/odca-candidate-photos/no-image.png' }}" alt="{{ candidate.name }}" />
  </div>
  <div><a href="{{ candidate.website_url }}">{{ candidate.website_url }}</a></div>
  <div><a href="https://twitter.com/{{ candidate.twitter_url }}">{{ candidate.twitter_url }}</a></div>
</section>
{{ candidate.content }}
<hr />
<section>
  <p>Contributions: {{ candidate.total_contributions | times: 100 | money }}</p>
  <p>Expenditures: {{ candidate.total_expenditures | times: 100 | money }}</p>
  <p>Loans: {{ candidate.total_loans_received | times: 100 |  money }}</p>
  <p>Current balance: {{ candidate.total_contributions | minus: candidate.total_expenditures | minus: candidate.total_loans_received | times: 100 | money }}</p>
</section>
<hr />
<section>
  <p>Expenditures opposing candidate: {{ candidate.opposing_money.opposing_expenditures | times: 100 | money }}</p>
</section>
<hr />
<section>
  <div class="section-subheading">Money coming in</div>
  <h2>Contributions</h2>
  {% for contribution_type in candidate.supporting_money.contributions_by_type %}
  <div>{{ contribution_type[0] }}</div>
  <div>{{ contribution_type[1] | times: 100 | money }}</div>
  {% endfor %}
</section>
<hr />
<section>
  <div class="section-subheading">Money going out</div>
  <h2>Expenditures</h2>
  {% for expenditure_type in candidate.supporting_money.expenditures_by_type %}
  <div>{{ expenditure_type[0] }}</div>
  <div>{{ expenditure_type[1] | times: 100 | money }}</div>
  {% endfor %}
</section>
