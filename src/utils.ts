export function secondsToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 1000 / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return formattedMinutes + ":" + formattedSeconds;
}

export function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 12-hour clock format

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  return formattedTime;
}

// Example usage:
const timestamp = Date.now(); // Replace this with your timestamp or time value
const humanReadableTime = formatTime(timestamp);
console.log(humanReadableTime);
