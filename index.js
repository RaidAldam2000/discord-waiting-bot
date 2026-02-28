// استدعاء مكتبة Discord.js
const { Client, GatewayIntentBits } = require("discord.js");

// إنشاء كائن البوت
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// قراءة القيم من Environment Variables
const TOKEN = process.env.TOKEN;
const WAITING_ROOM_NAME = process.env.WAITING_ROOM_NAME;
const NOTIFY_CHANNEL_ID = process.env.NOTIFY_CHANNEL_ID;

// حدث عند تشغيل البوت
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// حدث عند تغير حالة الصوت للأعضاء
client.on("voiceStateUpdate", (oldState, newState) => {
  // إذا العضو دخل روم صوتي
  if (!newState.channel) return;

  // تحقق من روم الانتظار
  if (newState.channel.name === WAITING_ROOM_NAME) {
    const notifyChannel = newState.guild.channels.cache.get(NOTIFY_CHANNEL_ID);
    if (!notifyChannel) return;

    // إرسال رسالة مع @everyone
    notifyChannel.send(
      `@everyone\n🚨 **تنبيه إدارة**\n👤 العضو: <@${newState.member.id}>\n⏰ متواجد في روم الانتظار ويحتاج تحويل`
    );
  }
});

// تسجيل دخول البوت
client.login(TOKEN);
