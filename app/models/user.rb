class User < ActiveRecord::Base
  has_many :seats
  has_many :games, :through => :seats
  
  def has_reservation_for?(game)
    !!Seat.find_by_user_id_and_game_id(id, game.id)
  end
end
