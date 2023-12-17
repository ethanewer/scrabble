function isValidMove(game, move) {
  return true;
}

async function playMove(gameId, move) {
  const updatedGame = await GameModel.findOneAndUpdate(
    { _id: gameId },
    { $set: { } },
    { new: true }
  );
  return updatedGame;
}

export {
  isValidMove,
  playMove,
};