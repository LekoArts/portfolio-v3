# TODOs

I want to simplify the writing sections of my website. Currently I have /writing and /garden as separate pages. It should become one /writing.

## Change URL structure

- Change /writing posts from /category/slug to /slug, e.g. `/javascript/writing-performant-css-with-vanilla-extract/` becomes `/writing-performant-css-with-vanilla-extract/`
- Change /garden posts from /garden/slug to /slug, e.g. `/garden/replacing-ls-with-eza/` becomes `/replacing-ls-with-eza/`

## Unify content

- Move `src/content/garden` into `src/content/writing`
- Add a `type` field to the frontmatter
- Update all garden posts to have `type: 'note'`
- Update all writing posts that have `type: 'prose'` to have `type: 'essay'`
- Update writing post's frontmatter field `category` to be an array of `topics` instead
- Update garden posts to change `tags` to `topics`
