exports.getSingleTicketView = function(appData, { personName }, { noAutoRefresh })
{
    let html = '';
    let playerNumber = appData.players.indexOf(personName);

    if (playerNumber < 0)
        html = '<h3>player not found</h3>';
    else
    {
        html += '<h2>Overall</h2>';

        html += `${getAllNumbersView()}`;

        html += getAllNumbersStyle(appData.generatedNumbers, tickedStyle);

        html += `<h3>Your Ticket</h3>${getTicketView(playerNumber, appData.tickets[playerNumber])}`;

        html += addTickedStyle(appData.ticked, tickedStyle)

        if (noAutoRefresh === '')
        {
            html += `<script>
            var startAutoRefresh = function()
            {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'));
            };
            </script>`;

            html += '<br><button type="button" onclick=startAutoRefresh()>Start Autorefresh</button>'
        }
        else
        {
            html += `<script>
            let timeOutId = setTimeout(function()
            {
                window.location.href = window.location.href
            }, 10000);

            var stopAutoRefresh = function()
            {
                clearTimeout(this);
                window.location.href = window.location.href + '?noAutoRefresh';
            }.bind(timeOutId);
            </script>`;

            html += '<br><button type="button" onclick=stopAutoRefresh()>Stop Autorefresh</button>'
        }
    }

    return html;
};

let getAllNumbersView = function()
{
    let html = '<table id=allNumbersTable border=1>';
    let number = 1;

    for (let rowIdx = 0 ; rowIdx < 10 ; rowIdx++)
    {
        html += '<tr>';

        for (let colIdx = 0 ; colIdx < 10 ; colIdx++, number++)
        {
            html += `<td id="cell_${number}">${number}</td>`;
        }

        html += '</tr>';
    }

    html += '</table>';

    return html;
};

let getAllNumbersStyle = function(generatedNumbers, tickedStyle)
{
    let style = '<style>table#allNumbersTable td { visibility: hidden; }</style>';

    style += '<style>';

    for (let idx = 0 ; idx < generatedNumbers.length ; idx++)
    {
        style += `td#cell_${generatedNumbers[idx]},`;
    }

    if (style.endsWith(','))
        style = style.substring(0, style.length - 1);

    style += ` { ${tickedStyle}visibility: visible !important; }</style>`;

    return style;
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