require 'test_helper'

class RatingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get rating_index_url
    assert_response :success
  end

end
