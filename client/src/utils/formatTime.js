export function formatTime(value) {
  const date = new Date(value);

  const now = new Date();
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const time = new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);

  if (isSameDay) {
    return `Today • ${time}`;
  }

  if (isYesterday) {
    return `Yesterday • ${time}`;
  }

  const day = new Intl.DateTimeFormat([], {
    month: 'short',
    day: 'numeric'
  }).format(date);

  return `${day} • ${time}`;
}