$(document).ready(function() {
	//check clicks are inside the board
	$("div div").click(function() {
		if ($("#game").val() == 'on') {
			var id = $(this).attr('id');
			var player = '';// store color of current player
			if ($(this).css('background-color') == "rgb(255, 255, 255)") {//check that player clicks on empty tile
				if (check_position(id)) {
					if ($("#state").val() == 'blue') {
						$(this).css("background-color", "red");
						player = "rgb(255, 0, 0)";
						$("#state").val('red');
						$("h3").html("BLUE turn").css("color", "blue")
					} else {
						$(this).css("background-color", "blue");
						player = "rgb(0, 0, 255)";
						$("#state").val('blue');
						$("h3").html("RED turn").css("color", "red")
					}

					var winner = is_winner(id, player);
					if (winner) {
						var winner_pos = winner.split(',');
						$.each(winner_pos, function(index, value) {
							$(value).html("*");
						});
						$("#game").val('off');
						if (player == "rgb(255, 0, 0)") {
							$("h3").html("RED WINS!!").css("color", "red");
						} else {
							$("h3").html("BLUE WINS!!").css("color", "blue");
						}
						$("div").fadeTo("slow", 0.9);
					}
				} else {
					alert("Don't put blocks in the air");
				}
			}
		}
	});
});
//check that there is another block or bottom side beneath the click
function check_position(id) {
	id = id - 10;
	if (id < 7) {//padding leading zero to make right row
		id = "0" + id;
	}
	if (id < 0) {//the click is on bottom side
		return true;
	} else if ($("#" + id).css('background-color') !== "rgb(255, 255, 255)") {
		return true;
	} else {
		return false;
	}
}

//check all directions from the clicked tile
function is_winner(index, player) {

	var row = Math.floor(index / 10);// get row
	var column = index - row * 10;// get column
	var diag_max = row - column;//this is used to set boundaries in diagonal check
	var winner = '';// stores index of winner sequence to be shown on board

	//check row
	var count = 0;
	for (var i = 0; i < 6; i++) {
		if ($("#" + row + i).css('background-color') == player) {
			count++;
			winner += "#" + row + i + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
	}
	//check column
	count = 0;
	winner = '';
	for (var i = 0; i < 7; i++) {
		if ($("#" + i + column).css('background-color') == player) {
			count++;
			winner += "#" + i + column + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
	}

	if (diag_max <= 0) {
		diag_max = row;
	} else {
		diag_max = column;
	}
	//check left down
	count = 0;
	winner = '';
	p_row = row;
	p_column = column;
	for (var i = diag_max; i >= 0; i--) {

		if ($("#" + p_row + p_column).css('background-color') == player) {
			count++;
			winner += "#" + p_row + p_column + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
		p_row--;
		p_column--;
	}
	//check right down
	count = 0;
	winner = '';
	p_row = row;
	p_column = column;
	for (var i = diag_max; i >= 0; i--) {

		if ($("#" + p_row + p_column).css('background-color') == player) {
			count++;
			winner += "#" + p_row + p_column + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
		p_row--;
		p_column++;
	}
	//check right up
	count = 0;
	winner = '';
	p_row = row;
	p_column = column;
	diag_max = column - row;
	var diag_start = 0;// stores the clicked tile
	if (diag_max > 0) {
		diag_max = 7;
		diag_start = column;
	} else {
		diag_max = 6;
		diag_start = row;
	}
	for (var i = diag_start; i < diag_max; i++) {

		if ($("#" + p_row + p_column).css('background-color') == player) {
			count++;
			winner += "#" + p_row + p_column + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
		p_row++;
		p_column++;
	}
	//check left up
	count = 0;
	winner = '';
	p_row = row;
	p_column = column;
	diag_max = column + row;
    diag_start = 0;
	if (diag_max >= 5) {
		diag_max = 5;
		diag_start = row;
	} else {
		diag_start = column;
	}
	for (var i = diag_start; i > 0; i--) {

		if ($("#" + p_row + p_column).css('background-color') == player) {
			count++;
			winner += "#" + p_row + p_column + ",";
		} else {
			count = 0;
			winner = '';
		}
		if (count == 4) {
			return winner;
		}
		p_row++;
		p_column--;
	}
	winner = '';
	return winner;
}
