exports.generateTickets = function(appData)
{
  let playersCount = appData.players.length;
  let ticketsObject = {};
  let tickedObject = {};

  for (let idx = 0 ; idx < playersCount ; idx++)
  {
    ticketsObject[idx] = [];
    tickedObject[idx] = [];

    for (let ticketNumberIdx = 0 ; ticketNumberIdx < 15 ; ticketNumberIdx++)
    {
      let ticketNumber = generateTicketNumber(ticketsObject[idx]);
      ticketsObject[idx].push(ticketNumber);
    }
  }

  appData.tickets = ticketsObject;
  appData.ticked = tickedObject;
  appData.generatedNumbers = [];
  appData.currentGeneratedNumber = undefined;

  return 'done';
};

let generateTicketNumber = function(playerTicket)
{
  while(true)
  {
    let generatedNumber = getRandomIntInclusive(1, 100);
    if (isNumberAlreadyGenerated(generatedNumber, playerTicket))
      continue;
    else
    {
      return generatedNumber;
    }
  };
};

let getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let isNumberAlreadyGenerated = function(generatedNumber, generatedNumbers)
{
  let index = generatedNumbers.indexOf(generatedNumber);

  return (index >= 0);
};