source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "puma", ">= 5.0"

gem "mongoid", "~> 9.0"
gem "bcrypt", "~> 3.1.7"
gem "twilio-ruby"
gem "bootsnap", require: false

# Optional: remove if you're not using Kamal for deployment
# gem "kamal", require: false

# Uncomment if your Angular frontend is served from a different origin
gem "rack-cors"

group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "dotenv-rails"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end
