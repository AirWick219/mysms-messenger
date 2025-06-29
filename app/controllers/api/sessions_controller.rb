module Api
  class SessionsController < ApplicationController
    allow_unauthenticated_access only: %i[ create ]
    rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to '/login', alert: "Try again later." }

    def create
      user = User.find_by(email_address: params[:email_address])
      if user&.authenticate(params[:password])
        start_new_session_for(user)
        head :ok
      else
        head :unauthorized
      end
    end

    def destroy
      terminate_session
      head :no_content
    end
  end
end
