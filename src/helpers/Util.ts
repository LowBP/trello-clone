
export function lastModifiedTime(millis: number) {
  const totalMinutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0) as unknown as number;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours) {
    return hours + ':' + minutes + ' hours ago';
  }
  
  if (!totalMinutes)
    return 'just now';

  return totalMinutes + ':' + (seconds < 10 ? '0' : '') + seconds + (' minutes ago');
}

export const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (!date) return '';

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + ' ' + month;
};
export const colorsList = [
  '#a8193d',
  '#4fcc25',
  '#1ebffa',
  '#8da377',
  '#9975bd',
  '#cf61a1',
  '#240959',
];


