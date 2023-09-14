function PlaybackButton(){
	
	this.cx = width/2;
	this.cy = height/2;
	this.radio = 400;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
		fill (255);
		textSize(50);
		textAlign(CENTER,CENTER);
		if(this.playing){

		}
		else{	
			text("Click on this planet to start.",this.cx,this.cy);
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		let distance = dist(mouseX, mouseY, this.cx, this.cy);
		if(distance <= this.radio){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
		return false;
	};

}
