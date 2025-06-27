class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email_address, type: String
  field :password_digest, type: String

  has_secure_password

  has_many :sessions, dependent: :destroy
  has_many :messages, dependent: :destroy
end
