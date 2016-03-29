require 'rails_helper'
require 'twitter_client'

describe TwitterClient do
  subject(:twitter_client) {described_class.new()}
  let(:user){double('tweet_user', screen_name:'test_screen_name')}
  let(:tweet){double('tweet', user: user, text: 'this is the test text', created_at: '2014-03-20')}
  let(:tweets){double('tweets', collect: tweet)}

  describe '#search' do
    it 'searches twitter for the params' do
      search_params = {search_term: 'Nokia', date_from: 2014-03-20, date_to: 2014-03-22}
      search = VCR.use_cassette("twitter_call") do
        twitter_client.search(search_params)
      end
      expect(search).to include(include(:username=>"BEDEALz"))
    end
  end

  describe '#extract_tweet_data' do
    it 'extracts the data needed from the tweets' do
      data = twitter_client.extract_tweet_data(tweets)
      expect(data.user.screen_name).to eq('test_screen_name')
    end
  end

end
