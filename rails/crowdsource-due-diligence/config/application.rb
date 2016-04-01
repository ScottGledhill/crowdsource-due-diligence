require File.expand_path('../boot', __FILE__)

require "rails"
# Pick the frameworks you want:


require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CrowdSourceDueDiligence
  class Application < Rails::Application
    module YourApp
      class Application < Rails::Application

        # ...

        config.middleware.insert_before 0, "Rack::Cors" do
          allow do
            origins '*'
            resource '*', :headers => :any, :methods => [:get, :post, :options]
          end
        end

      end
    end
  end
end
