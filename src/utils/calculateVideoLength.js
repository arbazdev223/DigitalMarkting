export function formatDurationFromSeconds(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
}

export function formatDurationFromString(timeStr) {
  const parts = timeStr.split(":").map(Number);
  let seconds = 0;

  if (parts.length === 3) {
    const [h, m, s] = parts;
    seconds = h * 3600 + m * 60 + s;
  } else if (parts.length === 2) {
    const [m, s] = parts;
    seconds = m * 60 + s;
  } else {
    seconds = Number(timeStr);
  }

  return formatDurationFromSeconds(seconds);
}
