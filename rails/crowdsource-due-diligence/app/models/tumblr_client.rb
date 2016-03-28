class TumblrClient
  attr_reader :tumblr_client

  def initialize
    @tumblr_client = Tumblr::Client.new({
      :consumer_key  => ENV['TUMBLR_KEY'],
      :consumer_secret => ENV['TUMBLR_SECRET'],
      :oauth_token => ENV['TUMBLR_TOKEN'],
      :oauth_token_secret => ENV['TUMBLR_TOKEN_SECRET'],
    })
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
