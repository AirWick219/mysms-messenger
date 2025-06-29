module Api
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

      twilio_client.send_sms(message)
      render json: message, status: :created
    end
  end
end
