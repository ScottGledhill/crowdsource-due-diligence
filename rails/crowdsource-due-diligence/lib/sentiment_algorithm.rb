require_relative 'positive_library'
require_relative 'negative_library'

class SentimentAlgorithm

  include PositiveLibrary
  include NegativeLibrary

  attr_reader :tweets, :search_term

  def initialize tweets, search_term
    @tweets = tweets
    @search_term = search_term
  end

  def match tweet
    tweet.downcase.include?(search_term.downcase)
  end

  def tweet_is_positive tweet
    positive_library.any? {|word| tweet.include?(word)}
  end

  def tweet_is_negative tweet
    negative_library.any? {|word| tweet.include?(word)}
  end

  def tweet_is_neutral tweet
    !tweet_is_positive(tweet) && !tweet_is_negative(tweet)
  end

  def compute_twitter_sentiment
    results = { positive: 0, neutral: 0, negative: 0 }
    tweets.each do |tweet|
      if match(tweet[:content])
        results[:positive] += 1 if tweet_is_positive(tweet[:content])
        results[:negative] += 1 if tweet_is_negative(tweet[:content])
        results[:neutral] += 1 if tweet_is_neutral(tweet[:content])
      end
    end
    results
  end
end
