require 'rails_helper'

describe SearchController do

  describe "GET #index" do
    it 'should be sucessfull' do
      get :index
      expect(response).to be_success
    end
  end

  describe "POST #create" do
    it 'should be sucessfull' do
      search_term = {search_term: 'Nokia'}
      search_result = {
        search_term: 'Nokia',
        positive: 4,
        neutral: 1,
        negative: 50
      }
      headers = {'CONTENT TYPE' => 'application/json'}
      VCR.use_cassette("post_create") do
        post :create, search_term, headers
      end
      expect(response).to be_success
    end
  end
end
