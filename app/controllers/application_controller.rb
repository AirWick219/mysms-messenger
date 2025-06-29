class ApplicationController < ActionController::API
  include ActionController::Helpers
  include ActionController::Cookies
  include Authentication

  def twilio_client
    @twilio_client ||= TwilioClient.new
  end
end
