class TwitterClient
  attr_reader :client
  def initialize
     @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS']
      config.access_token_secret = ENV['TWITTER_TOKEN_SECRET']
    end
  end

  def search(params)
    tweets = @client.search(params[:"search_term"], {lang: "en", result_type: "recent", since: params[:"date_from"], until: params[:"date_till"]}).take(100)
    extract_tweet_data(tweets)
  end

  def extract_tweet_data(tweets)
    tweets.collect{|tweet| {username: tweet.user.screen_name, content: tweet.text, date: tweet.created_at }}
  end
end
