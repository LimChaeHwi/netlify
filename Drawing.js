$(document).ready(function() {
	var cnvs = document.getElementById("cnvs");
	var ctx = cnvs.getContext('2d');
	var mode = 'line';
	console.log(ctx);
	
	
	$('#cnvs').on('touchstart', function(e) {
		this.down = true;
		
		//this.x = e.offsetX;
		//this.y = e.offsetY;
		this.x = e.touches[0].clientX;
		this.y = e.touches[0].clientY;
		ctx.moveTo(this.x, this.y);
	});
	
	$('#cnvs').on('touchend', function(e) {
		this.down = false;
		if (mode == 'text') {
			if ($("#inText").css('display')=='none') {
			//	$('#inText"').css("top", e.offsetY + "px");
			//	$('#inText"').css("left", e.offsetX + "px");
				$('#inText"').css("top", e.touches[0].clientY + "px");
				$('#inText"').css("left", e.touches[0].clientX + "px");
				$('#inText"').show();
				$('#inText"').focus();
			}
		}
	});
	
	$('#cnvs').on('touchmove', function(e) {
		if (this.down) {
			if (mode == 'line') 
			//	drawLine(ctx, e.offsetX, e.offsetY);			
				drawLine(ctx, e.touches[0].clientX, e.touches[0].clientY);			
		}
	});
	
});

function drawLine(ctx, x, y) {
	this.x = x;
	this.y = y;
	
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
}

function drawText(ctx, text, x, y) {
	ctx.fillText(text, x, y);
}
