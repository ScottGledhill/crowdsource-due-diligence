require_relative 'SentimentLibrary'

class SentimentAlgorithm

  include SentimentLibrary


  def word_match? tweet, search_term
    words = tweet.downcase.split(/[_\W+]/)
    words.any? { |word| search_term.downcase == word }
  end

  def tweet_positive? tweet
    positive_library.any? {|word| tweet.include?(word)}
  end

  def tweet_negative? tweet
    negative_library.any? {|word| tweet.include?(word)}
  end

  def tweet_neutral? tweet
    !tweet_positive?(tweet) && !tweet_negative?(tweet)
  end

  def compute_twitter_sentiment tweets, search_term
    results = { positive: 0, neutral: 0, negative: 0, search_term: search_term}
    tweets.each do |tweet|
      tweet = tweet[:content]
      if word_match?(tweet, search_term)
        results[:positive] += 1 if tweet_positive?(tweet)
        results[:negative] += 1 if tweet_negative?(tweet)
        results[:neutral] += 1 if tweet_neutral?(tweet)
      end
    end
    results
  end
end
