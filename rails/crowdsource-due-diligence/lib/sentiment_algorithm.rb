require_relative 'SentimentLibrary'

class SentimentAlgorithm

  include SentimentLibrary


  def match tweet, search_term
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

  def compute_twitter_sentiment tweets, search_term
    results = { positive: 0, neutral: 0, negative: 0, search_term: search_term}
    tweets.each do |tweet|
      if match(tweet[:content], search_term)
        results[:positive] += 1 if tweet_is_positive(tweet[:content])
        results[:negative] += 1 if tweet_is_negative(tweet[:content])
        results[:neutral] += 1 if tweet_is_neutral(tweet[:content])
      end
    end
    results
  end
end
