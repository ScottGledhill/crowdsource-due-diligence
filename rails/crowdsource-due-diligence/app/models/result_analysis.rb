class ResultAnalysis

  def initialize(sentiment_algorithm)
    @sentiment_algorithm = sentiment_algorithm
  end

  def analyse_tweets(tweets,search_term)
    @sentiment_algorithm.compute_total_sentiment(tweets,search_term)
  end
end
