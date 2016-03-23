class Search < ActiveRecord::Base

  extend SearchHelper

    def self.twitter_search(params)
    twitter_client.search(params["search_term"], lang: "en", result_type: "popular", since: params["date_from"], until: params["date_till"] ).take(100).collect do |tweet|
      {username: tweet.user.screen_name, content: tweet.text, date: tweet.created_at }
    end
  end
end
