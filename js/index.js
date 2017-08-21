$(document).ready(function(){
  pomodoro.init();
});

//Définit les variables
var pomodoro = {
    started : false, //état du timer - false: arrêter
    minutes : 0,
    seconds : 0,
    interval : null,
    minutesTimes : null,
    secondsTimes : null,
    
    init : function(){
      var self = this;
      this.minutesTimes = $('#minutes');
      this.secondsTimes = $('#seconds');
      
    this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
        
//Represente l'action à chaque clic
    $('#work').click(function(){
        self.startWork.apply(self);
      });
    $('#break').click(function(){
        self.startBreak.apply(self);
      });
    $('#stop').click(function(){
        self.resetBreak.apply(self);
      });
        
    $('#reset').click(function(){
        self.resetTimer.apply(self);
    });
        
    },
    
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
    },
    
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    
    startBreak : function(){
      this.resetVariables(5, 0, true);
    },
  
    resetTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateTimes();
    },
    
    resetBreak : function(){
        this.resetVariables(5,0,false);
        this.updateTimes();
    },
    
//Affiche un nombre à deux chiffres
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    
    
    updateTimes: function(){
      this.minutesTimes.text(this.toDoubleDigit(this.minutes));
      this.secondsTimes.text(this.toDoubleDigit(this.seconds));
    },
    
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateTimes();
    },
    timerComplete : function(){
        alert("Le temps est écoulé !");
      this.started = false;
    }
};

