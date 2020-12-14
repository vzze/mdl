const { indexes } = require("../../config/tictactoe.json")

module.exports = (board) => {
    let ok = true;
    indexes.forEach(ind => {
        if(!isNaN(board.charAt(ind))) {
            ok = false;
        }
    })
    return ok;
}