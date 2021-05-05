import Discord from "./icons/Discord";
import RightArrow from "./icons/RightArrow";

export default function DiscordInvite() {
  return (
    <section className="discord">
      <a href="https://ianmitchell.dev/discord">
        <Discord className="discord_icon" />
        <span className="discord_text">
          Join Server <RightArrow className="discord_arrow" />
        </span>
      </a>
    </section>
  );
}
