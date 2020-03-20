const { Client, MessageEmbed } = require("discord.js");
const fs = require("fs");
const bot = new Client();
const config = require("./config/config.json");

bot.on("ready", () => {
  console.log(" ");
  console.log("Connecté en tant que : " + bot.user.tag);
  bot.user.setAvatar("avatar.png").catch(console.error);
  bot.user.setActivity("En maintenance 🔧");
  bot.user.setStatus("dnd");
  console.log("Avatar et Jeu initialisé !");
});

bot.on("guildMemberAdd", member => {
    member.createDM().then(function (channel) {
        return channel.send("Bienvenue sur **le meilleur des serveurs**, j'espere qu'il te sera utile en ce temps maladif ! Amuse-toi bien **" + member.displayName + "** !");
    })
    console.log("DM envoyé !")
});

bot.on("guildMemberAdd", user => {
  const embed = new MessageEmbed()
    .setColor("#58df22")
    .setAuthor(user.user.username, user.user.displayAvatarURL())
    .setDescription(
        ":heart_eyes: Bienvenue **" + user.user.username + "** sur le serveur " + user.guild.name + " , j'espère qu'il te servira ! :heart:"
    )
    .setFooter("Serveur STI2D | SitrixxBOT");
  user.guild.channels.cache.get("589918783150358530").send(embed);
  console.log("Message de bienvenue (embed) envoyé pour " + user.user.username);
});

bot.on("guildMemberRemove", user => {
  const embed = new MessageEmbed()
    .setColor("#58df22")
    .setAuthor(user.user.username, user.user.displayAvatarURL())
    .setDescription(
      ":disappointed_relieved: Snifff.. **" +
        user.user.username +
        "** a déserté, on espère te revoir un jour.. | :innocent:"
    )
    .setFooter("Serveur STI2D | SitrixxBOT");
  user.guild.channels.cache.get("589918783150358530").send(embed);
  console.log("Message de bienvenue (embed) envoyé pour " + user.user.username);
});

bot.on("messageDelete", user => {
  const embed = new MessageEmbed()
    .setTitle("New Discord Message Deleted !")
    .setColor("RANDOM")
    .addField("Deleted by :", user.author.tag)
    .addField("Deleted in :", user.channel)
    .setFooter("SitrixxBOT");
  user.guild.channels.cache.get("689281751964450877").send(embed);
  console.log("Message de suppresion (embed) envoyé");
});

bot.on("message", message => {
  if (!message.guild) return;
  if (message.content === config.prefix + "hello") {
    message.channel.send("Salut **" + message.author.username + "** !");
    console.log("Réponse du !hello envoyé");
    message.delete();
  }
  if (message.content === config.prefix + "who") {
    message.channel.send(
      "Salut toi ! Je suis le bot discord mis en place pour améliorer la vie du serveur et créé pour les meilleurs STI2D, je te donnerais toutes les infos dont tu as besoin !\nUtilise-moi autant que tu le voudras.\nJe suis en constante amélioration grâce à mes chers créateurs, Enzo et William."
    );
    console.log("Réponse du Who envoyée");
  }
});

bot.login(config.token);
