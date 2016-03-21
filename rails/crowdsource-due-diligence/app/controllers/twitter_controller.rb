class TwitterController < ApplicationController
  @api = RestClient.get('https://api.twitter.com/1.1/search/tweets.json')
end
