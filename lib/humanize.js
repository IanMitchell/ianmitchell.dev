export default function humanize(array) {
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  return formatter.format(array);
}
