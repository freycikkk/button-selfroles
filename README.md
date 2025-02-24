# Self-Role System for Discord Bots

This self-role system allows users to assign themselves roles using interactive buttons in Discord. The system dynamically updates member counts and organizes roles into categories.

## Features
- Organized role categories
- Interactive buttons for self-role assignment
- Dynamic member count updates
- Supports multiple roles per category

## Installation & Setup

### Step 1: Import Dependencies
Ensure you import the required dependencies from `discord.js`:

```javascript
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Events,
} from "discord.js";
```

### Step 2: Define Role Data
Customize the `roleData` object with your desired roles:

```javascript
const roleData = {
  "Skid Roles": [
    { name: "Example Role 1", id: "ROLE_ID_1" },
    { name: "Example Role 2", id: "ROLE_ID_2" },
  ],
  "Mommy Lover": [
    { name: "Example Role 3", id: "ROLE_ID_3" },
    { name: "Example Role 4", id: "ROLE_ID_4" },
  ],
};
```

### Step 3: Event Listener
This script listens for the `.selfroles` command and sends an embed with buttons:

```javascript
export const name = Events.MessageCreate;
export async function run(_client, message) {
  if (message.content === ".selfroles") {
    const guild = message.guild;
    const embeds = [];

    for (const category in roleData) {
      const categoryRoles = roleData[category];

      for (const role of categoryRoles) {
        const memberCount = await guild.members.fetch().then((members) =>
          members.filter((member) => member.roles.cache.has(role.id)).size
        );
        role.memberCount = memberCount;
      }

      const roleButtons = categoryRoles.map((role) =>
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(`${role.name} - ${role.memberCount}`)
          .setStyle("Secondary")
      );

      const buttonActionRows = [];
      while (roleButtons.length > 0) {
        const rowButtons = roleButtons.splice(0, 5);
        buttonActionRows.push(new ActionRowBuilder().addComponents(rowButtons));
      }

      const embed = new EmbedBuilder().setTitle(category); // Customize embed
      embeds.push({ embeds: [embed], components: buttonActionRows });
    }

    for (const embed of embeds) {
      await message.channel.send(embed);
    }
  }
}
```

## Usage
- Send `.selfroles` in a Discord channel.
- The bot will respond with an interactive embed.
- Users can click the buttons to assign/remove roles.

## Customization
- Modify `roleData` to include your roles and categories.
- Customize the embed appearance as needed.

This self-role system makes it easy for users to assign themselves roles in a structured and interactive way! 🚀

