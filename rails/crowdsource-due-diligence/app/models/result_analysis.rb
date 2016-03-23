require_relative '../../lib/sentiment_algorithm.rb'

class ResultAnalysis

    def self.analyse_tweets(tweets, search_term)
      analysis = SentimentAlgorithm.new(tweets, search_term)
      analysis.compute_twitter_sentiment
    end

end
