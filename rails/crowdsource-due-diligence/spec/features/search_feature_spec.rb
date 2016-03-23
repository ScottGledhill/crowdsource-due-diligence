require 'rails_helper'

feature 'Search', type: :request do
  xscenario 'submitting a search term' do
    search_term = {search_term: 'Nokia'}
    headers = {'CONTENT TYPE' => 'application/json'}
    post "/search/", search_term, headers
    response_body = JSON.parse(response.body)

    expect(response_body["search_term"]).to eq search_term[:search_term]
  end

  scenario 'submitting search between times' do
    search_params = {search_term: 'Nokia', date_from: 2014-03-20, date_to: 2014-03-22}
    headers = {'CONTENT TYPE' => 'application/json'}
    post "/search/", search_params, headers
    response_body = JSON.parse(response.body)
    expect(response_body["created_at"]).to_include('2014')
  end
end
