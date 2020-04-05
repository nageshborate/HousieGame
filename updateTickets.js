exports.updateTickets = function(appData)
{
  let currentGeneratedNumber = appData.currentGeneratedNumber;

  let playersCount = appData.players.length;
  let ticketsObject = appData.tickets;
  let tickedObject = appData.ticked;

  for (let idx = 0 ; idx < playersCount ; idx++)
  {
    let playerNumber = idx;
    let playerTicket = ticketsObject[playerNumber];
    let playerTicked = tickedObject[playerNumber];

    let index = playerTicket.indexOf(currentGeneratedNumber);
    if (index >= 0)
      playerTicked.push(index);
  }

  return 'done';
};