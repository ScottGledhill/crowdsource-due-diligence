require_relative '../../lib/sentiment_algorithm'


class SearchController < ApplicationController
  skip_before_filter :verify_authenticity_token


  def index
    render :text => "Ok!"
  end

  def create
    search = Search.new(TwitterClient.new)
    search_result_twitter = search.twitter_search(params)
    resultanalysis = ResultAnalysis.new(SentimentAlgorithm.new)

    # search_result_twitter = get_fake_tweets
    results = resultanalysis.analyse_tweets(search_result_twitter, params[:"search_term"])
    render json: results.to_json
  end
end
