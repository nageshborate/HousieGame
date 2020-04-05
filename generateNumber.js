exports.generateNumber = function(appData) 
{
  while(true)
  {
    let generatedNumber = getRandomIntInclusive(1, 100);
    if (isNumberAlreadyGenerated(generatedNumber, appData.generatedNumbers))
      continue;
    else
    {
      appData.currentGeneratedNumber = generatedNumber;
      appData.generatedNumbers.push(generatedNumber);
      break;
    }
  };

  return `${appData.currentGeneratedNumber}`;
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