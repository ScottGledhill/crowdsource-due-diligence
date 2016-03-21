class TwitterController < ApplicationController

  def index
    @api = RestClient.get('https://api.twitter.com/1.1/search/tweets.json')
    @apijson = JSON.parse(@api)
  end
end
