export function formatTime(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}