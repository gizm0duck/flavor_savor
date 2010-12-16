class Game < ActiveRecord::Base
  has_many :seats
  has_many :users, :through => :seats
  
  def max_players
    5
  end
end
