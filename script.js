var context = new (window.AudioContext || window.webkitAudioContext)();
var volume = context.createGain();
volume.connect(context.destination);
volume.gain.value = 0.2;

$(document).ready(function(){ 
    $('#start').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#start').modal('show');
    $('#green').click(function(){
        if(!clickable){
            return;
        }
        selectColor('green');
        checkLoss('green');
    });
    $('#red').click(function(){
        if(!clickable){
            return;
        }
        selectColor('red');
        checkLoss('red');
    });
    $('#yellow').click(function(){
        if(!clickable){
            return;
        }
        selectColor('yellow');
        checkLoss('yellow');
    });
    $('#blue').click(function(){
        if(!clickable){
            return;
        }
        selectColor('blue');
        checkLoss('blue');
    });
});

var wins = 0; //number of wins
var plays = 0; //number of plays
var interval; //interval for pattern display
var count = 0; //counter for pattern display
var pattern = []; //array to hold pattern
var position; //position for checkLoss 
var clickable = false;

function startGame(){
    //$('#start').hide();
    game();
}

function game(){
    clickable = false;
    position = 0;
    plays+=1;
    playPattern();
}

function checkLoss(color){
    if(pattern[position]==color){
        position++;
        if(position == pattern.length){
            wins++;
            game();
        }
    }
    else{
        endGame();
    }
}

function endGame(){
    var s = 'Score: '+wins;
    $('#score').text(s);
    $('#end').modal('show');
}

function playPattern(){
    colors = ['green','red','yellow','blue'];
    colorIndex = Math.floor(Math.random()*4);
    pattern.push(colors[colorIndex]);
    count = pattern.length;
    interval = setInterval(patternHelper, 1000, pattern);
}

function patternHelper(pattern){
    selectColor(pattern[pattern.length-count]);
    if(count>0){
        count--;
    }
    else{
        clearInterval(interval);
        clickable = true;
        /*$('#play').modal('show');
        setTimeout(function(){
            $('#play').modal('hide');
            clickable = true;
        },1500);*/
    }
}

function selectColor(color){
    if(color == 'green'){
        $('#green').css('background-color', 'lightgreen');
        var osc1 = context.createOscillator(); // instantiate an oscillator
        osc1.type = 'square'; // this is the default - also square, sawtooth, triangle
        osc1.frequency.value = 329.63; // Hz
        osc1.connect(volume); // connect it to the destination
        osc1.start(); // start the oscillator
        osc1.stop(context.currentTime + .3); // stop 2 seconds after the current time
    }
    else if(color == 'red'){
        $('#red').css('background-color', 'pink');
        var osc2 = context.createOscillator(); // instantiate an oscillator
        osc2.type = 'square'; // this is the default - also square, sawtooth, triangle
        osc2.frequency.value = 220; // Hz
        osc2.connect(volume); // connect it to the destination
        osc2.start(); // start the oscillator
        osc2.stop(context.currentTime + .3); // stop 2 seconds after the current time

    }
    else if(color == 'yellow'){
        $('#yellow').css('background-color', 'lightyellow');
        var osc3 = context.createOscillator(); // instantiate an oscillator
        osc3.type = 'square'; // this is the default - also square, sawtooth, triangle
        osc3.frequency.value = 277.18; // Hz
        osc3.connect(volume); // connect it to the destination
        osc3.start(); // start the oscillator
        osc3.stop(context.currentTime + .3); // stop 2 seconds after the current time
    }
    else if(color == 'blue'){
        $('#blue').css('background-color', 'lightblue');
        var osc4 = context.createOscillator(); // instantiate an oscillator
        osc4.type = 'square'; // this is the default - also square, sawtooth, triangle
        osc4.frequency.value = 164.81; // Hz
        osc4.connect(volume); // connect it to the destination
        osc4.start(); // start the oscillator
        osc4.stop(context.currentTime + .3); // stop 2 seconds after the current time
    }
    setTimeout(resetColor, 500); //make less dependent on timing
}

function resetColor(){
    $('div').css('background-color','');
}
