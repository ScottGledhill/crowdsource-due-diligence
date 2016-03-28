class TumblrClient
  attr_reader :tumblr_client

  def initialize
    @tumblr_client = Tumblr::Client.new({
      config.consumer_key = ENV['TUMBLR_KEY']
      config.consumer_secret = ENV['TUMBLR_SECRET']
      config.oauth_token = ENV['TUMBLR_TOKEN']
      config.oauth_token_secret = ENV['TUMBLR_TOKEN_SECRET']
      })
    end
  end
end



#   def search(params)
#     tweets = @client.search(params[:"search_term"], {lang: "en", result_type: "recent", since: params[:"date_from"], until: params[:"date_till"]}).take(100)
#     extract_tweet_data(tweets)
#   end
#
#   def extract_tweet_data(tweets)
#     tweets.collect{|tweet| {username: tweet.user.screen_name, content: tweet.text, date: tweet.created_at } }
#   end
# end
