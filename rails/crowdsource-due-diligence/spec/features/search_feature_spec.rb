require 'rails_helper'

feature 'search', type: :request do
  scenario 'submitting a search term' do
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

    expect(response_body["search_term"]).to eq search_result[:search_term]
  end
end
