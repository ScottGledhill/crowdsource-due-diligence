#Edge Cases
####A place to keep track of potentially algorithm-breaking edge cases as the project progresses. This document should be updated as we think of new edge cases, and tests should be added for them regularly.

- <b>false negatives:</b> double negatives are often used to indicate positive sentiment (e.g. 'not bad').
- <b>irrelevant entries:</b> search terms could arbitrarily appear in messages that are not about them specifically, meaning that a sentiment aimed at something else would be attached to the search term.
