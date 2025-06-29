module Api
  class SessionsController < ApplicationController
    allow_unauthenticated_access only: %i[ create session_status ]
    rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

    def session_status
      if session[:user_id].present?
        render json: { logged_in: true }
      else
        render json: { logged_in: false }, status: :unauthorized
      end
    end

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
