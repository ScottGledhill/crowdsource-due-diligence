require 'rails_helper'

describe 'Twitter API request' do
  it 'queries twitter api' do
    

    results = twitter_client.search("makers acadedmy", result_type: "recent").take(100).collect do |tweet|
     "#{tweet.user.screen_name}: #{tweet.text}"
    end
    expect(results).to be_an_instance_of(String)
  end
end
