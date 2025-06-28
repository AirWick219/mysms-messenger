class HomeController < ApplicationController
  skip_before_action :require_authentication
  def index
    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end
