const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Lists the modules or info about a specific command.',
    usage: ['help', 'help <Module>', 'help <Command>'],
    cooldown: 2,
    premium: "Non-Premium",
    execute(mdl, message, args) {
        const modules = mdl.modules;
        modules.delete('owner');
        if(!mdl.pservers.has(message.guild.id)) modules.delete('autovc');
        if(!args[0]) {
            const temp = Array.from(modules.values());
            function stringer(mod) {
                while(mod.length < 17) mod += " ";
                return mod;
            }
            const main = new MessageEmbed()
                .setDescription("```prolog\n" + "MODULES        :: "
                    + temp.map((m, i) => `${(i % 3 == 0) ? stringer(m) : ""}`).join("").trim()
                    + "\n                  "
                    + temp.map((m, i) => `${(i % 3 == 1) ? stringer(m) : ""}`).join("").trim()
                    + "\nvz help <Module>  "
                    + temp.map((m, i) => `${(i % 3 == 2) ? stringer(m) : ""}`).join("").trim()
                    + "\n```"
                )
                .setThumbnail(`${mdl.client.user.displayAvatarURL()}`)
                .setColor(mdl.config.pcol);
            return message.channel.send(main);
        }
        const name = args[0].toLowerCase();
        const mod = modules.get(name);
        if(!mod) {
            const command = mdl.commands.get(name);
            let cmd;
            command ? cmd = command.cmd : cmd = mdl.aliases.get(name);
            if(!cmd) return;
            if(cmd.ownerOnly) return;
            if(cmd.premium == 'Premium' && !mdl.pservers.has(message.guild.id)) return;
            let firstalias = `Aliases     :: ${cmd.aliases[0]}\n`;
            const description = `─────────────────────────────────────────────────────────────\n${cmd.description}\n─────────────────────────────────────────────────────────────\n`;
            let firstusage = `Usage       :: ${mdl.config.prefix[2]} ${cmd.usage[0]}\n`;
            for(var i = 1; i < cmd.aliases.length; i++) {
                firstalias += `               ${cmd.aliases[i]}\n`;
            }
            for(var j = 1; j < cmd.usage.length; j++) {
                firstusage += `               ${mdl.config.prefix[2]} ${cmd.usage[j]}\n`;
            }
            const premium = (cmd.premium == "Premium") ? "Premium     :: True\n" : "Premium     :: False\n";
            const cooldown = `Cooldown    :: ${cmd.cooldown}`
            const commandem = new MessageEmbed()
                .setTitle(`Command: \`${mdl.config.prefix[2]} ${cmd.name}\``)
                .setDescription("```prolog\n" + firstalias + "\n" + description + "\n" + firstusage + "\n" + premium + "\n" + cooldown + "\n```")
                .setColor(mdl.config.pcol)
            return message.channel.send(commandem);
        }
        const cmds = (mdl.pservers.has(message.guild.id)) ? mdl.commands.filter(c => c.module == name) : mdl.commands.filter(c => c.module == name && c.cmd.premium != "Premium");
        const moduleem = new MessageEmbed()
            .setDescription(
                "```prolog\n" + `MODULE   :: ${mod}\n \u200B \nCommands :: `
                + cmds.map(c => `\'${c.cmd.name}\'`).join(", ")
                + "```"
            )
            .setColor(mdl.config.pcol)
        message.channel.send(moduleem);
    }
}