$(function(){
  var clock, startDate, lastDate;
  var personMliliseconds = 0;
  var costPerMilisecond = 0.015 / 1000;
  var requestAnimationFrame = window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame;

  function startClock() {
    startDate = lastDate = new Date();
    if(requestAnimationFrame) {
        clock = 1
        raf = function() {
          if (clock) {
            requestAnimationFrame( raf );
            counter();
          }
        }
        requestAnimationFrame( raf );;
    }else{
      clock = setInterval(counter, 10);
    }
  }

  function counter() {
    var now = new Date();
    updatePersonMiliseconds(now);
    displayCost();
    displayElapsedTime(now);
    lastDate = now;
  }

  function peepsCount() {
    return $('#peeps li').length;
  }

  function updatePersonMiliseconds(now) {
    personMliliseconds += (now - lastDate) * peepsCount();
  }

  function totalCost() {
    return (personMliliseconds * costPerMilisecond).toFixed(2);
  }

  function displayCost() {
    $('#dollarValue').text(totalCost());
  }

  function pluralize(number, label) {
    var string = number + ' ' + label;
    if (number !== 1) { string += 's'; }
    return string;
  }

  function displayElapsedTime(time) {
    var seconds = Math.floor((time - startDate) / 1000);
    var totalMinutes = Math.floor(seconds / 60);
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    var elapsed = [];
    if (hours)   { elapsed.push(pluralize(hours, 'hour')); }
    if (minutes) { elapsed.push(pluralize(minutes, 'minute')); }

    $('#elapsedTime').text(elapsed.join(' ') || 'just started');
  }

  $('#plus').click(function(){
    $('#peeps').append('<li/>');
    if (!clock) { startClock(); }
  });

  $('#minus').click(function(){
    if (peepsCount()) {
      $('#peeps li').last().remove();
    }
  });

});
