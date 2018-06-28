var xbox = require('node-xbox')("my xboxapi.com api key");

function convertMinsToDays(minutes) {
  return Math.floor(minutes/24/60) + " days " + Math.floor(minutes/60%24) + ' hours ' + Math.floor(minutes%60) + ' minutes';
}

function convertMinsToHrsMins(minutes) {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + ' hours and ' + m + ' minutes';
}

xbox.profile.gameStats("2535433011166172",219630713, function(err, gameStats){
  if (err) {
    console.log(err);
    return;
  }    
  var totalMinutes = 0;
  var minutesPlayed = JSON.parse(gameStats).statlistscollection[0].stats[0].value;
  totalMinutes += minutesPlayed;
  var spartansKilled = JSON.parse(gameStats).groups[0].statlistscollection[0].stats[1].value;
  var played = convertMinsToHrsMins(minutesPlayed);
  console.log(played + " played in Halo 5");
  console.log('You have killed ' + spartansKilled + ' spartans so far in Halo 5 multiplayer');
  xbox.profile.gameStats("2535433011166172",1144039928, function(err, gameStats){
    if (err) {
      console.log(err);
      return;
    }    
    var minutesPlayed = JSON.parse(gameStats).statlistscollection[0].stats[0].value;
    totalMinutes += minutesPlayed;
    var spartansKilled = JSON.parse(gameStats).groups[0].statlistscollection[0].stats[4].value;
    var played = convertMinsToHrsMins(minutesPlayed);
    console.log(played + " played in Halo MCC");
    console.log('You have killed ' + spartansKilled + ' spartans so far in Halo MCC multiplayer');
    var totalPlayed = convertMinsToDays(totalMinutes);
    console.log(totalPlayed + " wasted in all Halo games");
  });
});

