class TwitterController < ApplicationController

  def index
      @results = @twitter.search("Leo Allen", result_type: "recent").take(100).collect do |tweet|
      "#{tweet.user.screen_name}: #{tweet.text}"
    end
  end
end
