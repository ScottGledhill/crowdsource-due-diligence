module SearchHelper

  def twitter_client
      Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS']
      config.access_token_secret = ENV['TWITTER_TOKEN_SECRET']
    end
  end
end
