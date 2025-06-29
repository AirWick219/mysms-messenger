class TwilioClient
  def initialize
    @client = Twilio::REST::Client.new(
      ENV["TWILIO_SID"],
      ENV["TWILIO_AUTH_TOKEN"]
    )
  end

  def send_sms(message)
    twilio_message = @client.messages.create(
      from: ENV["TWILIO_PHONE"],
      to: message.phone_number,
      body: message.body,
      status_callback: "#{Rails.application.credentials.base_url}/twilio/status"
    )

    message.update(twilio_sid: twilio_message.sid, status: "sent")
  end
end
