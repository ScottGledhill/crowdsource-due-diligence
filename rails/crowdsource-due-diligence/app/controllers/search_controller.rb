class SearchController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    render :text => "Ok!"
  end

  def create
    @search_term = params[:search_term]
    @search_result = {
      search_term: 'Nokia',
      positive: 4,
      neutral: 1,
      negative: 50
                  }

    render json: @search_result.to_json
  end
end
