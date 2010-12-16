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
  
  setState: function(state){
    scriptCube.current().find('.button').hide();
    if(state == 'reserve') {
      scriptCube.current().find('.reserve').show();
    } else {
      scriptCube.current().find('.cancel').show();
    }
  }
}

function updateCube(game){
  scriptCube = $.extend(gameCube, game);
  scriptCube.setButtonState();
  scriptCube.setSpotsAvailable();
  var avatarsHtml = $.mustache(mustachios.avatarList, scriptCube, {avatarTemplate: mustachios.avatar});
  scriptCube.current().children('.avatars').html(avatarsHtml);
}

$(function() {
  $(".reserve").live("click", function(){
    var url = "/seats/reserve?game_id=" + $(this).parents(".gameCube")[0].getAttribute("gameid") + "&user_id=" + currentUser.id;
    $.post(url, function(snapshot) {
      updateCube(snapshot);
    });
  });
  
  $(".cancel").live("click", function(){
    var url = "/seats/cancel?game_id=" + $(this).parents(".gameCube")[0].getAttribute("gameid") + "&user_id=" + currentUser.id;
    $.post(url, function(snapshot) {
      updateCube(snapshot);
    });
  });
});