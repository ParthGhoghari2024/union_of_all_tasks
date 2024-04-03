
async function ticTacToePage(req, res) {
	try {
		res.render("tictactoe/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = ticTacToePage;