Rails.application.routes.draw do
  namespace :api do
    resource :session, only: [:create, :destroy]
    resource :password, only: [:create, :edit, :update]
    resources :messages, only: [:index, :create]
    post '/twilio/status', to: 'twilio#status'
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root to: 'home#index'
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
