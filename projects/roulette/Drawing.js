$(document).ready(function() {
	var cnvs = document.getElementById("cnvs");
	var ctx = cnvs.getContext('2d');
	var mode = 'line';
//	console.log(ctx);
	
	$('#cnvs').on('touchstart', function(e) {
		this.down = true;
		ctx.moveTo(e.touches[0].clientX-230, e.touches[0].clientY-1200);
	});
	
	$('#cnvs').on('touchend', function(e) {
		this.down = false;
		/*
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
		*/
	});
	
	$('#cnvs').on('touchmove', function(e) {
		if (this.down) {
			if (mode == 'line') {
				drawLine(ctx, e.touches[0].clientX-230, e.touches[0].clientY-1200);
			}			
		}
	});
	
});

function drawLine(ctx, x, y) {
	ctx.lineTo(x, y);
	ctx.stroke();
}