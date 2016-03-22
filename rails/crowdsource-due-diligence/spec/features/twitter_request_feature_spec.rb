require 'rails_helper'

describe 'Twitter API request', type: :request do
  it 'queries twitter api' do
    search_term = {search_term: 'Nokia'}
    search_result = {
      search_term: 'Nokia',
      positive: 4,
      neutral: 1,
      negative: 50
                  }
    headers = {'CONTENT TYPE' => 'application/json'}
    post "/search/", search_term, headers
    response_body = JSON.parse(response.body)
    #
    #
    # results = twitter_client.search("makers acadedmy", result_type: "recent").take(100).collect do |tweet|
    #  "#{tweet.user.screen_name}: #{tweet.text}"
    # end
    expect(response_body).to be_an_instance_of(String)
  end
end
