Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.


  config.cache_classes = true


  config.eager_load = false

  # Configure static file server for tests with Cache-Control for performance.
  config.serve_static_files   = true
  config.static_cache_control = 'public, max-age=3600'

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true



  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true
end
