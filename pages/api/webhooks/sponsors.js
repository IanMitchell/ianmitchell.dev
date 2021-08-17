export default function () {}
// export default function SponsorsWebhook(request, response) {
// if (request.method !== "POST") {
//   return;
// }
// const payload = request.body;
// const embed = {
//   footer: {
//     icon_url: "",
//     text: "GitHub Sponsors",
//   },
//   timestamp: payload?.sponsorship?.created_at,
// };
// switch (payload.action) {
//   case "created":
//     embed.color = 0x65280;
//     break;
//   case "pending_tier_change":
//   default:
//     embed.color = "";
// }
// if (payload?.sponsorship?.privacy_level === "public") {
//   data.author = {
//     name: payload?.sponsorship?.sponsor?.login,
//     url: payload?.sponsorship?.sponsor?.url,
//     icon_url: payload?.sponsorship?.sponsor?.avatar_url,
//   };
// }
// if (payload?.sponsorship?.tier?.is_one_time) {
// }
// if (payload?.sponsorship?.tier?.is_custom_amount) {
// }
// if (payload?.sponsorship?.changes?.tier?.from) {
// }
// response.status(200);
// }
