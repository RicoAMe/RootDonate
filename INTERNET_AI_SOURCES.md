# Internet AI sources

RootDonate currently fetches Wikipedia summaries when it has no matching response. The Wikipedia API source is returned as a title, but the reply does not currently include a clickable article URL.

## Wikipedia

- Search/API: https://en.wikipedia.org/w/api.php
- Article URL pattern: `https://en.wikipedia.org/wiki/<article_title>`
- API summary URL pattern: `https://en.wikipedia.org/api/rest_v1/page/summary/<article_title>`

## Oxford Learner’s Dictionaries

- Dictionary homepage: https://www.oxfordlearnersdictionaries.com/
- English word lookup pattern: `https://www.oxfordlearnersdictionaries.com/definition/english/<word>`

Oxford’s public dictionary page is documented here as a source link. This does not scrape Oxford pages or fetch definitions; automatic Oxford lookup would require a supported API or other authorized integration. The app’s current internet fallback remains Wikipedia.
