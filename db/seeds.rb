# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)

User.create([{:name => "Shane"}, {:name => "Sean"}])
Game.create([{:name => "Hopscotch"}, {:name => "Par-cheesy"}, {:name => "Yahtzee!"}])
Seat.create({:user_id => User.first.id, :game_id => Game.first.id})