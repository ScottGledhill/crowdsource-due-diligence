require 'rails_helper'

describe SentimentAlgorithm do

  subject(:algorithm) { described_class.new() }

  describe '#compute_total_sentiment' do

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
    let(:sentiment_hash) {{ positive: 3, neutral: 2, negative: 3, search_term: search_term }}

    it 'takes tweets and a search term and returns a sentiment hash' do
      expect(algorithm.compute_total_sentiment(tweets, search_term)).to include sentiment_hash
    end

    it 'outputs keywords for each message' do
      results = algorithm.compute_total_sentiment(tweets, search_term)
      msg_sentiment = {
                        sentiment: :positive,
                        posWords: ['awesome'],
                        negWords: [],
                        positive: 1,
                        negative: 0,
                        content: 'iphone is awesome'
                      }
      expect(results[:messages]).to include msg_sentiment
    end
  end

  describe '#search_term_match?' do
    let(:p_msg) {'iphones are expensive'}
    let(:s_msg) {'iphone is expensive'}
    let(:s_search_term) {'iPhone'}
    let(:p_search_term) {'iPhone'}

    it 'is able to match singular search to plural results' do
      expect(algorithm.search_term_match?(p_msg, s_search_term)).to eq true
    end

    it 'is able to match plural search to singular result' do
      expect(algorithm.search_term_match?(s_msg, p_search_term)).to eq true
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
      let(:expected_results) {{ positive: 0, neutral: 1, negative: 0, search_term: 'pie' }}

      it 'does not increment negative sentiment if negated' do
        expect(algorithm.compute_total_sentiment(tweets, search)).to include expected_results
      end
    end

    describe 'false positives' do
      let(:tweets) {[{content: 'Celery isn\'t good'}]}
      let(:search) {'celery'}
      let(:expected_results) {{ positive: 0, neutral: 1, negative: 0, search_term: 'celery' }}

      it 'does not increment positive sentiment if negated' do
        expect(algorithm.compute_total_sentiment(tweets, search)).to include expected_results
      end
    end

    describe 'non-words' do
      let(:tweets) {[{content:'Urijah Faber is a good fighter!'}]}
      let(:nonsense_search) {'abe'}
      let(:expected_results) {{ positive: 0, neutral: 0, negative: 0, search_term: 'abe' }}
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
        expect(algorithm.compute_total_sentiment(tweets, nonsense_search)).to include expected_results
      end
    end

    context 'tricky adverbs' do

      describe 'positive valence' do
        let(:tweets) {[{content: 'Pizza is terribly tasty'}]}
        let(:search) {'pizza'}
        let(:expected_results) {{ positive: 1, neutral: 0, negative: 0, search_term: 'pizza' }}

        it 'positive valence not offset by negative adverb' do
          expect(algorithm.compute_total_sentiment(tweets, search)).to include expected_results
        end
      end

      describe 'negative valence' do
        let(:tweets) {[{content: 'The Room is amazingly shit'}]}
        let(:search) {'The Room'}
        let(:expected_results) {{ positive: 0, neutral: 0, negative: 1, search_term: 'The Room' }}

        it 'negative valence not offset by positive adverb' do
          expect(algorithm.compute_total_sentiment(tweets, search)).to include expected_results
        end
      end
    end

    describe 'double-dipping' do

      describe '#absolute_message_sentiment' do
        let(:pos_msg) {'I am good, she is bad, overall good'}
        let(:neg_msg) {'I am good, she is bad, overall bad'}
        let(:neut_msg) {'I am good, she is bad'}

        it 'finds positive' do
          algorithm.absolute_message_sentiment(pos_msg)
          expect(algorithm.current_message[:sentiment]).to eq :positive
        end

        it 'finds negative' do
          algorithm.absolute_message_sentiment(neg_msg)
          expect(algorithm.current_message[:sentiment]).to eq :negative
        end

        it 'finds neutral' do
          algorithm.absolute_message_sentiment(neut_msg)
          expect(algorithm.current_message[:sentiment]).to eq :neutral
        end

      end

      let(:tweets) {[
                      {content: 'London is good'},
                      {content: 'London is bad. Very bad.'},
                      {content: 'London is fun, but bad'}
                    ]}
      let(:search) {'London'}
      let(:expected_results) {{ positive: 1, neutral: 1, negative: 1, search_term: 'London' }}

      it 'only one sentiment per tweet' do
        expect(algorithm.compute_total_sentiment(tweets, search)).to include expected_results
      end
    end
  end
end
