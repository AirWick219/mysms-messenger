class HomeController < ApplicationController
  skip_before_action :require_authentication
  def index
    puts "[HOME_CONTROLLER] Serving index.html"

    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end
