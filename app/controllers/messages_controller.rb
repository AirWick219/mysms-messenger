class MessagesController < ApplicationController
  include Authentication
  before_action :require_authentication

  def index
    messages = current_user.messages.order_by(created_at: :desc)
    render json: messages
  end

  def create
    message = current_user.messages.create!(
      phone_number: params[:phone_number],
      body: params[:body],
      status: "pending"
    )

    # Send SMS via Twilio
    send_via_twilio(message)

    render json: message, status: :created
  end

  def twilio_status
    message = Message.find_by(twilio_sid: params[:MessageSid])
    message&.update(status: params[:MessageStatus])
    head :ok
  end

  private

  def send_via_twilio(message)
    client = Twilio::REST::Client.new(
      ENV["TWILIO_SID"],
      ENV["TWILIO_AUTH_TOKEN"]
    )

    twilio_message = client.messages.create(
      from: ENV["TWILIO_PHONE"],
      to: message.phone_number,
      body: message.body
      # status_callback: "#{ENV['API_BASE_URL']}/twilio/status"
    )

    message.update(twilio_sid: twilio_message.sid, status: "sent")
  end
end
