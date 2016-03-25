#Edge Cases
####A place to keep track of potentially algorithm-breaking edge cases as the project progresses. This document should be updated as we think of new edge cases, and tests should be added for them regularly.

EASY FIX:

- <b>(SOLVED) double-dipping:</b> a tweet should only have one sentiment (rather than each sentiment word match increasing the pos/neg/neut count)
- <b>(SOLVED) false negatives:</b> double negatives are often used to indicate positive sentiment (e.g. 'not bad').
- <b>(SOLVED) false positives:</b> e.g. 'not good'
- <b>(SOLVED) tricky adverbs:</b> should only be counted as the second sentiment, e.g. 'amazingly terrible', 'awfully tasty'.
- <b>(SOLVED) non-words:</b> word partials would create false matches if they're part of other words (e.g. 'abe'). Implement a feature that matches the search term only as a standalone word. At the same time, you still need to be able to search for a multi-word phrase!


HARD FIX:

- <b>irrelevant entries:</b> search terms could arbitrarily appear in messages that are not about them specifically, meaning that a sentiment aimed at something else would be attached to the search term. Need to process the subject of the tweet.
- <b>library bias:</b> the negative library is twice as large as the positive library! Hopefully fixing the other issue will resolve this bias.
