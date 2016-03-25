#Edge Cases
####A place to keep track of potentially algorithm-breaking edge cases as the project progresses. This document should be updated as we think of new edge cases, and tests should be added for them regularly.

EASY FIX:

- <b>double-dipping:</b> a tweet should only have one sentiment (rather than each sentiment word match increasing the pos/neg/neut count)
- <b>false negatives:</b> double negatives are often used to indicate positive sentiment (e.g. 'not bad').
- <b>false positives:</b> e.g. 'amazingly terrible'.
- <b>non-words:</b> word partials would create false matches if they're part of other words (e.g. 'abe'). Implement a feature that matches the search term only as a standalone word.


HARD FIX:

- <b>irrelevant entries:</b> search terms could arbitrarily appear in messages that are not about them specifically, meaning that a sentiment aimed at something else would be attached to the search term. Need to process the subject of the tweet.
- <b>library bias:</b> the negative library is twice as large as the positive library! Hopefully fixing the other issue will resolve this bias.
