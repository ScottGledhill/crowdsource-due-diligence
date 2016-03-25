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

  describe '#tweet_positive?' do
    it 'returns true if positive' do
      expect(algorithm.tweet_positive?('I am cool')).to be true
    end
    it 'returns false if negative' do
      expect(algorithm.tweet_positive?('I am crap')).to be false
    end
  end

  describe '#tweet_negative?' do
    it 'returns true if negative' do
      expect(algorithm.tweet_negative?('I am crap')).to be true
    end
    it 'returns false if positive' do
      expect(algorithm.tweet_negative?('I am cool')).to be false
    end
  end

  describe '#tweet_neutral?' do
    it 'returns true if neither positive nor negative' do
      expect(algorithm.tweet_neutral?('I am Rufus')).to be true
    end
    it 'returns false if positive' do
      expect(algorithm.tweet_neutral?('I am cool')).to be false
    end
    it 'returns false if negative' do
      expect(algorithm.tweet_neutral?('I am crap')).to be false
    end
  end

  xdescribe '#compute_twitter_sentiment' do
    it 'takes tweets and a search term and returns a sentiment hash' do
      expect(algorithm.compute_twitter_sentiment(tweets, search_term)).to eq sentiment_hash
    end
  end

  describe 'edge cases' do

    describe 'false negatives' do

    end

    describe 'non-words' do
      tweets = [{content:'Urijah Faber is a good fighter!'}]
      nonsense_search = 'abe'
      expected_results = { positive: 0, neutral: 0, negative: 0, search_term: 'abe'}

      it 'doesn\'t match results for partial/non-words' do
        expect(algorithm.word_match?(tweets[0][:content], nonsense_search)).to be false
      end

      it 'accounts for special characters-combined words' do
        chars = ['/', '-', '_', '\\', '&', '@', '!', '?', ' ']

        chars.each do |char|
          tweet = "Abe#{char}Lincoln"
          expect(algorithm.word_match?(tweet, nonsense_search)).to be true
        end
      end

      it 'returns empty results for partial/non-words' do
        expect(algorithm.compute_twitter_sentiment(tweets, nonsense_search)).to eq expected_results
      end
    end


  end

end
