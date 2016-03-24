require 'rails_helper'

feature 'Search', type: :request do
  scenario 'querying the twitter api' do
    search_term = {search_term: 'Nokia'}
    search_result = {
      search_term: 'Nokia',
      positive: 4,
      neutral: 1,
      negative: 50
                  }

    headers = {'CONTENT TYPE' => 'application/json'}

    response_body = VCR.use_cassette("twitter_stub") do
      post "/search/", search_term, headers
      JSON.parse(response.body)
    end

    expect(response_body["search_term"]).to eq search_result[:search_term]
  end
end
