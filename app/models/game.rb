class Game < ActiveRecord::Base
  has_many :seats
  has_many :users, :through => :seats
end
