class Api::TwilioController < ApplicationController
  skip_before_action :require_authentication
  def status
    message = Message.find_by(twilio_sid: params[:MessageSid])
    message&.update(status: params[:MessageStatus])
    head :ok
  end
end
