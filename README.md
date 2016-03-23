#Does it suck?
###Crowdsourcing due diligence research via Twitter sentiment analysis

[![Stories in Ready](https://badge.waffle.io/rufusraghunath/crowdsource-due-diligence.png?label=ready&title=Ready)](http://waffle.io/rufusraghunath/crowdsource-due-diligence)

Makers Academy final project, made collaboratively by Rufus Raghunath, Eirik Wiig, Scott Gledhill, and Jonny Pickard.

View it on Heroku at https://does-it-suck.herokuapp.com/.

Work in progress.

USER STORIES:

```
As a consumer,
So I can decide whether or not to invest in a product,
I want to know whether the product has been well-received.
```
```
As a Does It Suck? user,
So I can find information on the product of my choice,
I want to enter what I'm interested in.
```
```
As a Does It Suck? user,
So I can easily understand my search results,
I want to see a very simple breakdown of overall sentiment with % good, bad, and neutral.
```
```
As a Does It Suck? user,
So I can have access to more advanced features,
I want to make a user account.
```
```
As an advanced Does It Suck? user,
So I can see my search results in context,
I want to see changes in sentiment over time.
```

TECHNOLOGIES USED:

- Ruby on Rails
- AngularJS
- PostgreSQL


ACKNOWLEDGEMENTS:

Thanks to Bing Liu and Minquing Hu for compiling comprehensive libraries of positive and negative valence words in their <a href='https://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html#lexicon'>Opinion Lexicon</a>. This was used in processing social media input (e.g. tweets) for sentiment.
