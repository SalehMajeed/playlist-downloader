function generateApiUrl(url) {
  return `${process.env.REACT_APP_BASE_URL}${url}`;
}

function convertIntoTimeLine(seconds){
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [hours, minutes, remainingSeconds]
    .map(unit => unit < 10 ? `0${unit}` : unit)
    .join(':');

  return formattedTime;
}

export { generateApiUrl, convertIntoTimeLine };
