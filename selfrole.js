import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Events,
} from "discord.js";

const roleData = {
  /* Change the Title if you want to*/ "Skid Roles": [
    { name: "", id: "" },
    { name: "", id: "" },
    /// ... more if you like to dumb ass skidder
  ],
  "Mommy Lover": [
    { name: "", id: "" },
    { name: "", id: "" },
    /// ... more if you like to dumb ass skidder
  ],
  // ... skidding continues
};

export const name = Events.MessageCreate;
export async function run(_client, message) {
  if (message.content === ".selfroles") {
    const guild = message.guild;
    const embeds = [];

    for (const category in roleData) {
      const categoryRoles = roleData[category];

      for (const role of categoryRoles) {
        const memberCount = await guild.members.fetch().then((members) => {
          return members.filter((member) => member.roles.cache.has(role.id))
            .size;
        });
        role.memberCount = memberCount;
      }

      const roleButtons = categoryRoles.map((role) => {
        return new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(`${role.name} - ${role.memberCount}`)
          .setStyle("Secondary");
      });

      const buttonActionRows = [];
      while (roleButtons.length > 0) {
        const rowButtons = roleButtons.splice(0, 5);
        const buttonActionRow = new ActionRowBuilder().addComponents(
          rowButtons
        );
        buttonActionRows.push(buttonActionRow);
      }

      const embed = new EmbedBuilder(); // set embed as you like too

      embeds.push({ embeds: [embed], components: buttonActionRows });
    }

    for (const embed of embeds) {
      const sentMessage = await message.channel.send(embed);
      for (const component of embed.components[0].components) {
        component.interactionID = sentMessage.id;
      }
    }
  }
}
