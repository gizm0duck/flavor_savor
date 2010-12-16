# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_flavor_saver_session',
  :secret      => 'c37cc329ff72083a24bcbee8a0e6f31ff7bb0231ebdce44b16ef4de02dda33c147ba2fa7006414bf2e14c7491692ff700c3ea348e1d2ae19b07c1cb10f202a18'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
