require_relative 'SentimentLibrary'

class SentimentAlgorithm

  include SentimentLibrary

  NEGATORS = ['not', 'isnt', 'aint']

  def words tweet
    tweet.gsub!("'", "")
    tweet.downcase.split(/[_\W]+/)
  end

  def word_match? tweet, search_term
    words(tweet).any? { |word| search_term.downcase == word }
    # have to account for multiple word searches here
  end

  def positive? tweet
    positive_library.any? {|word| tweet.include?(word)}
  end

  def negative? tweet
    negative_library.each do |lib_word|
      if tweet.include?(lib_word)
        words(tweet).each.with_index do |tweet_word, i|
          if lib_word == tweet_word
            return true unless NEGATORS.include?(words(tweet)[i-1])
          end
        end
      end
    end
    false
  end

  def neutral? tweet
    !positive?(tweet) && !negative?(tweet)
  end

  def compute_twitter_sentiment tweets, search_term
    results = { positive: 0, neutral: 0, negative: 0, search_term: search_term}
    tweets.each do |tweet|
      tweet = tweet[:content]
      if word_match?(tweet, search_term)
        results[:positive] += 1 if positive?(tweet)
        results[:negative] += 1 if negative?(tweet)
        results[:neutral] += 1 if neutral?(tweet)
      end
    end
    results
  end
end
