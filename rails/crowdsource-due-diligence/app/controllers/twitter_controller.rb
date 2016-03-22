class TwitterController < ApplicationController

  def index
      @results = twitter_client.search("makers academy", result_type: "recent").take(100).collect do |tweet|
      "#{tweet.user.screen_name}: #{tweet.text}"
    end
  end
end
