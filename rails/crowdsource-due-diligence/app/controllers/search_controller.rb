class SearchController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    render :text => "Ok!"
  end

  def create
    @search_term = params[:search_term]
    search_result_twitter = twitter_search(@search_term)
    p search_result_twitter
    @search_result = {
      search_term: 'Nokia',
      positive: 4,
      neutral: 1,
      negative: 50
                  }
    render json: @search_result.to_json
  end

  def twitter_search(search_term)
    results = []
    @results = twitter_client.search(search_term, result_type: "recent").take(100).collect do |tweet|
      results.push({username: tweet.user.screen_name, content: tweet.text})
    end
    return results
  end

end
