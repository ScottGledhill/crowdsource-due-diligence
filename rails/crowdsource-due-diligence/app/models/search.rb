
class Search
  def initialize(twitterclient)
    @twitter_client = twitterclient
  end

  def twitter_search(params)
    @twitter_client.search(params)
  end


end
