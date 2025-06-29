require "test_helper"

class Api::TwilioControllerTest < ActionDispatch::IntegrationTest
  test "should get status" do
    get api_twilio_status_url
    assert_response :success
  end
end
