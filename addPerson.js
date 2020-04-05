exports.addPerson = function(appData, { personName })
{
    let html = '';
    let playerNumber = appData.players.indexOf(personName);

    if (playerNumber >= 0)
        html = '<h3>player already exists</h3>';
    else
    {
        appData.players.push(personName);

        html = '<h3>player added</h3>';
    }

    return html;
};
