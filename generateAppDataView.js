exports.generateAppDataView = function(appData) 
{
  let html = '';

  let getGeneratedNumbersView = function(generatedNumbers)
  {
    return `<h2>Generated Numbers: ${generatedNumbers.length === 0 ? 'None' : [...generatedNumbers].sort((a, b) => a-b)}</h2>`;
  };

  let getCurrentGeneratedNumberView = function(currentGeneratedNumber)
  {
    let viewHtml = '';

    if (currentGeneratedNumber && currentGeneratedNumber != null)
    {
      viewHtml += `<h2>Current Number: ${currentGeneratedNumber}</h2>`;
    }

    return viewHtml;
  };

  let getTicketView = function(playerNumber, ticketArray)
  {
    let ticketHTML = '<table border=1>';
    
    for (let idx = 1 ; idx <= 15 ; idx++)
    {
      if (idx === 1 || idx === 6 || idx === 11)
        ticketHTML += '<tr>';

      ticketHTML += `<td id="cell_${playerNumber}_${idx - 1}">${ticketArray[idx - 1]}</td>`;

      if (idx === 5 || idx === 10)
        ticketHTML += '</tr>';
    }

    ticketHTML += '</tr></table>';

    return ticketHTML;
  };

  let playersCount = appData.players.length;

  html += getGeneratedNumbersView(appData.generatedNumbers);

  html += `${getCurrentGeneratedNumberView(appData.currentGeneratedNumber)}`;

  for (let idx = 0 ; idx < playersCount ; idx++)
    html += `<h3>${appData.players[idx]}</h3><br>${getTicketView(idx,appData.tickets[idx])}`

  const tickedStyle = "border-color: black; border-bottom-style: solid;border-width: thick;font-size: x-large;font-weight: bold;";

  let addTickedStyle = function(tickedObject, tickedStyle)
  {
    let style = '<style>';

    for (let playerNumber in tickedObject)
    {
      let ticketArray = tickedObject[playerNumber];
      for (let pos of ticketArray)
        style += `td#cell_${playerNumber}_${pos},`;
    }

    if (style.endsWith(','))
      style = style.substring(0, style.length - 1);

    style += ` { ${tickedStyle} }</style>`;

    return style;
  }

  html += addTickedStyle(appData.ticked, tickedStyle)

  html += `<script>
  setTimeout(function()
  {
    window.location.href = window.location.href
  }, 10000);
  </script>`;

  return html;
}