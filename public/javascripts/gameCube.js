gameCube = {
  playerCount: function(){
    return this.seats.length;
  },
  
  setButtonState: function(){
    var self = this
    var is_reserved = false;
    $.each(this.seats, function(i,seat){
      if (seat.user.id == currentUser.id){
        is_reserved = true;
      }
    });
    if(is_reserved) {
      this.setState('cancel');
    } else {
      this.setState('reserve');
    }
  },
  
  current: function() {
    return $('#cube-'+this.id);
  },
  
  maxPlayers: function(){
    return 5;
  },
  
  setSpotsAvailable: function(){
    this.current().find('.spots-remaining').html(this.maxPlayers()-this.playerCount() + " spots available");
  },
  
  onReserveClick: function(){
    // ajax on current_user
    this.setState('cancel');
  },
  
  onCancelClick: function(){
    // ajax on current_user
    this.setState('reserve');
  },
  
  setState: function(state){
    scriptCube.current().find('.button').hide();
    if(state == 'reserve') {
      scriptCube.current().find('.reserve').show();
    } else {
      scriptCube.current().find('.cancel').show();
    }
  }
}

function initViews() {
  partials = {avatarTemplate: mustachios.avatar}
  avatarListView = mustachios.avatarList;
}
function updateCube(game){
  scriptCube = $.extend(gameCube, game);
  scriptCube.setButtonState();
  scriptCube.setSpotsAvailable();
  var avatarsHtml = $.mustache(avatarListView, scriptCube, partials);
  scriptCube.current().children('.avatars').html(avatarsHtml);
}

$(function() {
  $(".reserve").live("click", function(){
    var url = "/seats/reserve?game_id=" + $(this).parents(".game")[0].getAttribute("gameid") + "&user_id=" + currentUser.id;
    $.post(url, function(snapshot) {
      updateCube(snapshot);
    });
  });
  
  $(".cancel").live("click", function(){
    alert("YOU SHALL NOT PASS");
  });
  
  $(".rsvp").live("click", function(){
    $.post(this.getAttribute("url"), function(snapshot) {
      updateCube(snapshot);
    });
  });
  initViews();
});