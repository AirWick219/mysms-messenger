class HomeController < ApplicationController
  skip_before_action :require_authentication, raise: false

  def index
    puts "[HOME_CONTROLLER] Serving index.html"

    send_file Rails.root.join('public', 'index.html'), type: 'text/html', disposition: 'inline'
  end
end
