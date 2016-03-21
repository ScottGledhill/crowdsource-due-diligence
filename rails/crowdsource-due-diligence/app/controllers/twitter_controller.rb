class TwitterController < ApplicationController

  def index
    @api = RestClient.get('https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4')
    @apijson = JSON.parse(@api)
  end
end
