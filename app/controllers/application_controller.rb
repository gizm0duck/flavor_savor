# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  layout 'application'
  before_filter :set_current_user
  
  def set_current_user
    @current_user = User.find_by_id(2)
  end
  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
end
