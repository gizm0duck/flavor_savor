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
  
  setGameName: function() {
    $(".game-name", this.current()).html(this.name);
  },
  
  current: function() {
    return $('#cube-'+this.id);
  },
  
  maxPlayers: function(){
    return 5;
  },
  
  setSpotsAvailable: function(){
    $('.spots-remaining', this.current()).html(this.maxPlayers()-this.playerCount() + " spots available");
  },
  
  populateGame: function() {
    this.setButtonState();
    this.setSpotsAvailable();
    this.setGameName();
  },
  
  setState: function(state){
    $('.button', scriptCube.current()).hide();
    if(state == 'reserve') {
      $('.reserve', scriptCube.current()).show();
    } else {
      $('.cancel', scriptCube.current()).show();
    }
  }
}

function updateCube(game){
  scriptCube = $.extend(gameCube, game);
  scriptCube.populateGame();
  var avatarsHtml = $.mustache(mustachios.avatarList, scriptCube, {avatarTemplate: mustachios.avatar});
  scriptCube.current().children('.avatars').html(avatarsHtml);
}

function createCube(game){
  $(".gameList").append($(generated_templates.game_cube).attr("id", "cube-" + game.id).attr("gameid", game.id));
  updateCube(game);
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