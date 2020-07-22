export default function humanize(array) {
  if (!array) {
    return '';
  }

  switch (array.length) {
    case 0:
      return '';
    case 1:
      return array[0];
    case 2:
      return array.join(' and ');
    default: {
      const [last, ...arr] = array.reverse();
      return `${arr.reverse().join(', ')}, and ${last}`;
    }
  }
}
