const {
  Command
} = require('../../commands')

module.exports = class nowPlayingCommand extends Command {
  constructor() {
    super({
      name: 'nowplaying',
      aliases: ['np', 'nowp'],
      category: 'music',
      priority: 7,
      permLvl: 0
    })
  }
  async execute(msg, args, discord, client) {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);

    if (!serverQueue) return msg.channel.send('Şu anda bir şey Oynatılmıyor');
    if (serverQueue.songs.length === 0) return msg.channel.send('Bekleme listesinde şarkı yok.');

    const queueSongs = serverQueue.songs;

    function statsDuration(song) {
      let durationSeconds = song.duration.seconds < 9 ? '0' + song.duration.seconds : song.duration.seconds;
      let durationMinutes = song.duration.minutes < 9 ? '0' + song.duration.minutes : song.duration.minutes;
      let durationHours = song.duration.hours < 9 ? '0' + song.duration.hours : song.duration.hours;

      return `**__${durationHours}:${durationMinutes}:${durationSeconds}__**`;
    }

    const queueEmbed = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail(queueSongs[0].thumbnail)
      .setDescription(`Şimdi çalıyor:\n**${queueSongs[0].title}**\nSüre: ${statsDuration(queueSongs[0])}`)

    return msg.channel.send(queueEmbed)

  }
}