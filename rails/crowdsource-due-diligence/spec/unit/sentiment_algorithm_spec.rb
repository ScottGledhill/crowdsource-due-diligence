require 'rails_helper'

describe SentimentAlgorithm do

  subject(:algorithm) { described_class.new() }

  let(:pos_lib) {algorithm.positive_library}
  let(:neg_lib) {algorithm.negative_library}

  describe 'sentiment methods' do

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


    describe '#lookup' do

      context 'positive library' do
        it 'returns true if positive' do
          expect(algorithm.lookup(pos_lib, 'I am cool')).to be true
        end
        it 'returns false if negative' do
          expect(algorithm.lookup(pos_lib, 'I am crap')).to be false
        end
      end

      context 'negative library' do
        it 'returns true if negative' do
          expect(algorithm.lookup(neg_lib, 'I am crap')).to be true
        end
        it 'returns false if positive' do
          expect(algorithm.lookup(neg_lib, 'I am cool')).to be false
        end
      end
    end

    xdescribe '#compute_sentiment' do
      it 'takes tweets and a search term and returns a sentiment hash' do
        expect(algorithm.compute_sentiment(tweets, search_term)).to eq sentiment_hash
      end
    end
  end

  describe 'edge cases' do

    describe 'multiple words' do
      let(:message) {"A long time ago, in a galaxy far, far away..."}
      let(:search_term) {"In a galaxy"}
      it 'is able to match who phrases' do
        expect(algorithm.search_term_match?(message, search_term)).to be true
      end
    end

    describe 'false negatives' do
      let(:tweets) {[{content: 'Pie ain\'t bad'}]}
      let(:search) {'pie'}
      let(:expected_results) {{ positive: 0, neutral: 1, negative: 0, search_term: 'pie'}}

      it 'does not increment negative sentiment if negated' do
        expect(algorithm.compute_sentiment(tweets, search)).to eq expected_results
      end
    end

    describe 'false positives' do
      let(:tweets) {[{content: 'Celery isn\'t good'}]}
      let(:search) {'celery'}
      let(:expected_results) {{ positive: 0, neutral: 1, negative: 0, search_term: 'celery'}}

      it 'does not increment positive sentiment if negated' do
        expect(algorithm.compute_sentiment(tweets, search)).to eq expected_results
      end
    end

    describe 'non-words' do
      let(:tweets) {[{content:'Urijah Faber is a good fighter!'}]}
      let(:nonsense_search) {'abe'}
      let(:expected_results) {{ positive: 0, neutral: 0, negative: 0, search_term: 'abe'}}
      let(:chars) {['/', '-', '_', '\\', '&', '@', '!', '?', ' ']}

      it 'doesn\'t match results for partial/non-words' do
        expect(algorithm.search_term_match?(tweets[0][:content], nonsense_search)).to be false
      end

      it 'accounts for special characters-combined words' do
        chars.each do |char|
          tweet = "Abe#{char}Lincoln"
          expect(algorithm.search_term_match?(tweet, nonsense_search)).to be true
        end
      end

      it 'returns empty results for partial/non-words' do
        expect(algorithm.compute_sentiment(tweets, nonsense_search)).to eq expected_results
      end
    end
  end
end
