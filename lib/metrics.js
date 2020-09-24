export function logMetric({ name, value }) {
  const url = `https://qckm.io?m=${name}&v=${value}&k=dkSG3sUJ8i-J1A_vlZtq8A`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url);
  } else {
    fetch(url, {
      method: "POST",
      keepalive: true,
    });
  }
}
