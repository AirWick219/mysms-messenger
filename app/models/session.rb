class Session
  include Mongoid::Document
  include Mongoid::Timestamps

  field :token, type: String
  field :ip_address, type: String
  field :user_agent, type: String

  belongs_to :user

  before_create :generate_token

  private

  def generate_token
    self.token ||= SecureRandom.hex(32)
  end
end
