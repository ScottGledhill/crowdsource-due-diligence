require 'rails_helper'

describe SentimentAlgorithm do

  let(:tweets) {[
                    {content: 'love my new iphone! <3'},
                    {content:'The Apple iPhone is a cultural totem'},
                    {content:'lolz got another iphone'},
                    {content:'why are iphones so expensive?!'},
                    {content:'iPhones are soooo cool!'},
                    {content:'I like pizza'},
                    {content:'Sometimes I kiss my pillow'},
                    {content:'This iPhone is a piece of crap'},
                    {content:'Barney is a dinosaur'},
                    {content:'I wish my iphone screen wasn\'t broken.. again'},
                    {content: 'iphone is awesome'}
                  ]}

  let(:search_term) {'iPhone'}
  let(:sentiment_hash) {{ positive: 4, neutral: 2, negative: 3, search_term: search_term }}

  subject(:algorithm) { described_class.new() }

  describe '#tweet_is_positive' do
    it 'returns true if positive' do
      expect(algorithm.tweet_is_positive('I am cool')).to be true
    end
    it 'returns false if negative' do
      expect(algorithm.tweet_is_positive('I am crap')).to be false
    end
  end

  describe '#tweet_is_negative' do
    it 'returns true if negative' do
      expect(algorithm.tweet_is_negative('I am crap')).to be true
    end
    it 'returns false if positive' do
      expect(algorithm.tweet_is_negative('I am cool')).to be false
    end
  end

  describe '#tweet_is_neutral' do
    it 'returns true if neither positive nor negative' do
      expect(algorithm.tweet_is_neutral('I am Rufus')).to be true
    end
    it 'returns false if positive' do
      expect(algorithm.tweet_is_neutral('I am cool')).to be false
    end
    it 'returns false if negative' do
      expect(algorithm.tweet_is_neutral('I am crap')).to be false
    end
  end

  describe '#compute_twitter_sentiment' do
    it 'takes tweets and a search term and returns a sentiment hash' do
      expect(algorithm.compute_twitter_sentiment(tweets, search_term)).to eq sentiment_hash
    end
  end

end
