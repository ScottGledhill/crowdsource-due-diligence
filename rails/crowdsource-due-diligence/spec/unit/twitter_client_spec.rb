require 'rails_helper'
require 'twitter_client'

describe TwitterClient do
  subject(:twitter_client) {described_class.new()}
  let(:user){double('tweet_user', screen_name:'test_screen_name')}
  let(:tweet){double('tweet', user: user, text: 'this is the test text', created_at: '2014-03-20')}
  let(:tweets){double('tweets', collect: tweet)}

  describe '#search' do
    xit 'searches twitter for the params' do
      params = {"search_term": 'Nokia', "date_from": "2014-03-20", "date_till": "2014-03-22"}
      stub_request(:get, "https://api.twitter.com/1.1/search/tweets.json?count=100&lang=en&q=Nokia&result_type=recent&since=2014-03-20&until=2014-03-22")
      expect(twitter_client.search(params)).to be_an_instance_of(Array)
    end
  end

  describe '#extract_tweet_data' do
    it 'extracts the data needed from the tweets' do
      data = twitter_client.extract_tweet_data(tweets)
      expect(data.user.screen_name).to eq('test_screen_name')
    end
  end

end
