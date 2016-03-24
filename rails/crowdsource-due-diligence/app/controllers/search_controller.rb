

class SearchController < ApplicationController
  skip_before_filter :verify_authenticity_token


  def index
    render :text => "Ok!"
  end

  def create
    search = Search.new(TwitterClient.new)
    search_result_twitter = search.twitter_search(params)
    resultanalysis = ResultAnalysis.new(SentimentAlgorithm.new)

    # search_result_twitter = get_fake_tweets
    results = ResultAnalysis.analyse_tweets(search_result_twitter, search_term)
    render json: results.to_json
  end



  # def get_fake_tweets
  #   [{:username=>"anastasiarodio", :content=>"Можнои ли найти программу, которая позволяет регулировать звук на телефоне Motorola L6?"}, {:username=>"JoWBloE", :content=>"Was in the 11th grade, working at lil Caesar's, wit a temp fade &amp; a Motorola pager  https://t.co/b2edtkde7f"}, {:username=>"sordoeli", :content=>"As-Is Red Verizon Motorola Droid Turbo - Cracked Unresponsive Touchscreen https://t.co/IX5XmFyF7G https://t.co/RYqNuyLKA0"}, {:username=>"victoriamaurino", :content=>"Motorola Japan 12BA6 Grey Ribbed Plate Top [] Getter Vacuum Tube https://t.co/nwDhb6SPzK https://t.co/qrnjM6X1My"}, {:username=>"NicolasVDB", :content=>"Congratulations Aymar de Lencquesaing - exciting times ahead for the new Motorola! https://t.co/VYRBn5zAfl"}, {:username=>"homeshopbuzz", :content=>"#cellular #deals https://t.co/P3fhpo8Q8K Motorola Power Pack Slim4000 Portable Battery Pack - 4000mAh\n\n$7.99   $39… https://t.co/RC39Jr8Vtu"}, {:username=>"homeshopbuzz", :content=>"#cellular #deals https://t.co/Z0x1FT856Z Motorola XT1096 Moto X 2nd Generation Verizon 16GB Football Leather Smart… https://t.co/FWT9XBo4NA"}, {:username=>"eBayShopperNews", :content=>"#eBay #deal Motorola XT907 Droid Razr M 4G LTE Verizon Wireless Android WiFi Smartphone https://t.co/UPM2qwFWth #eBayUS #BuyNow"}, {:username=>"MiLiBortol", :content=>"RT @quierojoda: se acuerdan del motorola v3 que piola tener ese celular te sentías antonia macri entrando al jardín con ropa de marca patea…"}, {:username=>"edelruizmar", :content=>"Motorola -1N5232B 5.6V  500mW  DO-204AA Zener Diodes -50pcs https://t.co/f1xrK4CAii https://t.co/dGLH1Avja3"}]
  # end

end
