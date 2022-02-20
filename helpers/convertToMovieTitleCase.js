const titleCase = require("./titleCase");

const convertToMovieTitleCase = (string) => {
  const splitString = string.toLowerCase().split(' ');
  let arrayString = []
  
  for (let i = 0; i < splitString.length; i++) {
    switch (splitString[i]) {
      case "the" :
        arrayString.push(splitString[i]);
        break;
      case "and" :
        arrayString.push(splitString[i]);
        break;
      case "a" :
        arrayString.push(splitString[i]);
        break;
      case "an" :
        arrayString.push(splitString[i]);
        break;
      default :
        arrayString.push(titleCase(splitString[i]))
    }
    
  }

  return arrayString.join(' ')
}

module.exports = convertToMovieTitleCase