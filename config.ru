# This file is used by Rack-based servers to start the application.
puts "RAILS STARTING... PORT: #{ENV['PORT']}"

require_relative "config/environment"

run Rails.application
