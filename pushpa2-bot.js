/**
 * Pushpa 2 Telegram Channel Auto-Post Bot
 * 
 * This bot automatically posts content about the movie "Pushpa 2: The Rule"
 * to a specified Telegram channel at scheduled times.
 * Each post includes a link to the main movie search bot (@BestMovieSearchHubBot).
 * 
 * Features:
 * - Scheduled posts at IST: 8:25 AM, 10:40 AM, 12:20 PM, 3:20 PM, 7:25 PM
 * - 25 unique posts (cast, dialogues, box office, fan reactions, etc.)
 * - Inline button that directly opens the main movie bot
 * - SEO-friendly hashtags in each post
 * - Graceful shutdown handling
 * 
 * Deploy on Render with Node.js environment.
 */

// ==================== DEPENDENCIES ====================
const { Telegraf } = require('telegraf');
const express = require('express');
const cron = require('node-cron');
require('dotenv').config();

// ==================== CONFIGURATION ====================
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME || '@Pushpa2_HDMovie'; // Your channel
const MAIN_BOT_USERNAME = process.env.MAIN_BOT_USERNAME || '@BestMovieSearchHubBot';

if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is missing! Set it in environment variables.');
  process.exit(1);
}

// ==================== EXPRESS SERVER FOR RENDER ====================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('✅ Pushpa 2 Channel Bot is running!'));
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => {
  console.log(`🚀 Express server listening on port ${PORT}`);
});

// ==================== TELEGRAM BOT INIT ====================
const bot = new Telegraf(BOT_TOKEN);

// ==================== POST CONTENT LIBRARY (25 UNIQUE POSTS) ====================
const POSTS = [
  // 1. Movie Introduction
  {
    type: 'text',
    content: `🔥 **Pushpa 2: The Rule – The Wildfire Returns** 🔥

🎬 **Starring:** Allu Arjun, Rashmika Mandanna, Fahadh Faasil
📅 **Release:** December 2024
🌍 **Languages:** Telugu, Hindi Dubbed, Tamil, Kannada, Malayalam

👇 **Full Movie Download:**
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Pushpa2TheRule #AlluArjun #Rashmika #FahadhFaasil #SouthMovie #Blockbuster`
  },

  // 2. Allu Arjun's Iconic Look
  {
    type: 'text',
    content: `🪓 **Pushpa's Mass Look** 🪓

Allu Arjun returns as Pushpa Raj with a never-seen-before avatar!
The swag, the attitude, the style – everything is next level.

📥 Watch the full movie:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #AlluArjun #PushpaRaj #MassMaharaj #StylishStar`
  },

  // 3. Rashmika as Srivalli
  {
    type: 'text',
    content: `🌸 **Srivalli's Love Story Continues** 🌸

Rashmika Mandanna reprises her role as Srivalli.
Her chemistry with Pushpa will melt your heart.

👇 Full movie here:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Rashmika #Srivalli #LoveStory #Romance`
  },

  // 4. Fahadh Faasil as the Villain
  {
    type: 'text',
    content: `👿 **Fahadh Faasil – The Menacing Villain** 👿

After KGF, another pan-India villain emerges!
Fahadh's performance as the antagonist is chilling.

📥 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #FahadhFaasil #Villain #Antagonist #PanIndia`
  },

  // 5. Box Office Records
  {
    type: 'text',
    content: `💰 **Box Office Tsunami** 💰

✅ Highest opening day for an Indian film: **₹300 crore+**
✅ Fastest to ₹1000 crore worldwide
✅ Biggest hit in Hindi dubbed history

Be part of the record:
📥 ${MAIN_BOT_USERNAME}

#Pushpa2 #BoxOffice #Records #Blockbuster #AlluArjun`
  },

  // 6. Dialogues That Became Viral
  {
    type: 'text',
    content: `🗣️ **Dialogues That Shook The Nation** 🗣️

*"Thaggede le!"*
*"Pushpa, fire nahi… wildfire hoon!"*
*"Jhukega nahi saala!"*

Relive the magic:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Dialogues #ThaggedeLe #Wildfire #MassDialogue`
  },

  // 7. Songs and Music
  {
    type: 'text',
    content: `🎵 **Blockbuster Songs** 🎵

"Srivalli" – 1B+ views
"Oo Antava" – 800M+ views
"Saami Saami" – 600M+ views

Listen & watch the full movie:
📥 ${MAIN_BOT_USERNAME}

#Pushpa2 #Songs #Srivalli #OoAntava #DeviSriPrasad`
  },

  // 8. Action Sequences
  {
    type: 'text',
    content: `💥 **Never-Seen-Before Action** 💥

Pushpa 2 features some of the most epic action sequences ever filmed in Indian cinema. Massive scale, jaw-dropping stunts.

👇 Watch it now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Action #MassScenes #Stunts #Blockbuster`
  },

  // 9. Sukumar's Direction
  {
    type: 'text',
    content: `🎥 **Sukumar's Masterpiece** 🎥

Director Sukumar takes the franchise to new heights with intricate storytelling and stunning visuals.

📥 Download the full movie:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Sukumar #Director #Masterpiece #Cinema`
  },

  // 10. OTT Release? No!
  {
    type: 'text',
    content: `❌ **Still Not on OTT?** ❌

Despite huge demand, Pushpa 2 is still not available on any OTT platform in India.
The only way to watch is through our bot!

📥 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #OTT #NotOnNetflix #NotOnPrime #Exclusive`
  },

  // 11. Fan Reactions
  {
    type: 'text',
    content: `⭐ **Fans Are Going Crazy** ⭐

*"Allu Arjun's career-best performance!"*
*"Better than KGF 2!"*
*"Watched 5 times already!"*

Add your review after watching:
📥 ${MAIN_BOT_USERNAME}

#Pushpa2 #FanReactions #Reviews #MustWatch`
  },

  // 12. Pushpa's Style
  {
    type: 'text',
    content: `👕 **Pushpa's Signature Style** 👕

The checked shirts, the lungi, the red sandalwood – Pushpa's style is iconic!
Fans are copying his look everywhere.

👇 Watch the movie to see it all:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Style #Fashion #PushpaLook`
  },

  // 13. Srivalli's Character Arc
  {
    type: 'text',
    content: `🌺 **Srivalli's Journey** 🌺

From a village belle to Pushpa's strength, Srivalli's character evolves beautifully. Rashmika shines in this role.

📥 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Srivalli #Rashmika #CharacterArc`
  },

  // 14. Fahadh's Transformation
  {
    type: 'text',
    content: `🔄 **Fahadh's Physical Transformation** 🔄

Fahadh Faasil underwent a massive body transformation to play the ruthless cop. His intensity is unmatched.

👇 Watch his performance:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #FahadhFaasil #Transformation #MethodActing`
  },

  // 15. Behind the Scenes
  {
    type: 'text',
    content: `🎬 **Behind the Scenes Magic** 🎬

Massive sets in the forests of Kerala, real sandalwood smugglers as consultants, and months of prep.

📥 Get the full movie:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #BehindTheScenes #Making #Filmmaking`
  },

  // 16. Worldwide Collections
  {
    type: 'text',
    content: `🌎 **Global Domination** 🌎

USA: $20 million
UAE: $15 million
Australia: $8 million
Japan: $5 million

Be part of the global phenomenon:
📥 ${MAIN_BOT_USERNAME}

#Pushpa2 #Worldwide #GlobalHit #IndianCinema`
  },

  // 17. Awards and Nominations
  {
    type: 'text',
    content: `🏆 **Award-Winning Film** 🏆

✅ National Award for Best Actor (Allu Arjun)
✅ Filmfare Awards – 7 wins
✅ IIFA Awards – 5 wins

Watch the award-winning performance:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Awards #NationalAward #AlluArjun`
  },

  // 18. Comparison with Pushpa 1
  {
    type: 'text',
    content: `📈 **Pushpa 1 vs Pushpa 2 – Bigger & Better** 📈

Pushpa 1: ₹350 crore worldwide
Pushpa 2: ₹1500 crore+ worldwide

The sequel surpasses the original in every way!

📥 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Pushpa1 #Comparison #BiggerBetter`
  },

  // 19. Allu Arjun's Career Best
  {
    type: 'text',
    content: `🎭 **Allu Arjun's Career-Defining Role** 🎭

Bunny has outdone himself. His dialogue delivery, body language, and expressions are pure gold.

👇 Witness the magic:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #AlluArjun #CareerBest #IconicRole`
  },

  // 20. Tamil/Telugu Versions
  {
    type: 'text',
    content: `🌐 **Available in Multiple Languages** 🌐

✅ Telugu (Original)
✅ Hindi Dubbed
✅ Tamil
✅ Kannada
✅ Malayalam

Choose your language and download:
📥 ${MAIN_BOT_USERNAME}

#Pushpa2 #Languages #Telugu #HindiDubbed #Tamil #Kannada #Malayalam`
  },

  // 21. Critics Reviews
  {
    type: 'text',
    content: `⭐ **What Critics Say** ⭐

*"A masterpiece of commercial cinema."* – Indian Express
*"Allu Arjun delivers a tour de force."* – The Hindu
*"Pushpa 2 raises the bar for pan-Indian films."* – Times of India

👇 Watch the critically acclaimed film:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #CriticsReviews #Masterpiece #Blockbuster`
  },

  // 22. Memes and Social Media Buzz
  {
    type: 'text',
    content: `😂 **Pushpa 2 Memes Taking Over** 😂

From "Thaggede le" to "Jhukega nahi saala", Pushpa 2 memes are everywhere!
Join the fun and watch the movie to get all references.

📥 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Memes #SocialMedia #Trending`
  },

  // 23. The Red Sandalwood Story
  {
    type: 'text',
    content: `🌲 **The Red Sandalwood Saga** 🌲

Based on the real-life red sandalwood smuggling in the Seshachalam forests. Pushpa 2 delves deeper into the illegal trade.

👇 Watch the gripping story:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #RedSandalwood #RealStory #Smuggling`
  },

  // 24. Production Budget
  {
    type: 'text',
    content: `💰 **Biggest Budget in Indian Cinema** 💰

Budget: ₹500 crore
Recovered in just 3 days!

A true blockbuster.

📥 Download the high-budget spectacle:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Budget #BiggestFilm #IndianCinema`
  },

  // 25. Download Links Post
  {
    type: 'text',
    content: `📥 **Download Pushpa 2 Full Movie** 📥

✅ 4K / 1080p / 720p
✅ Telugu + Hindi Dubbed + Tamil + Kannada + Malayalam
✅ Fast download (Terabox/Doodstream)

👇 Download now:
👉 ${MAIN_BOT_USERNAME}

#Pushpa2 #Download #4K #HindiDubbed #SouthMovie #Blockbuster`
  }
];

// ==================== FUNCTION TO SEND RANDOM POST WITH BUTTON ====================
async function sendRandomPost() {
  try {
    const randomIndex = Math.floor(Math.random() * POSTS.length);
    const post = POSTS[randomIndex];
    
    console.log(`📤 Sending post #${randomIndex + 1} at ${new Date().toLocaleString()}`);
    
    if (post.type === 'text') {
      await bot.telegram.sendMessage(CHANNEL_USERNAME, post.content, {
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📥 Download Now', url: `https://t.me/${MAIN_BOT_USERNAME.replace('@', '')}` }]
          ]
        }
      });
      console.log('✅ Post sent successfully with button!');
    }
  } catch (error) {
    console.error('❌ Failed to send post:', error.message);
    if (error.response) {
      console.error('Telegram API response:', error.response);
    }
  }
}

// ==================== SCHEDULED POSTS (IST TIMINGS) ====================
// Cron times in UTC (IST - 5:30)

// 8:25 AM IST = 2:55 UTC
cron.schedule('55 2 * * *', () => {
  console.log('⏰ Scheduled: 8:25 AM IST');
  sendRandomPost();
});

// 10:40 AM IST = 5:10 UTC
cron.schedule('10 5 * * *', () => {
  console.log('⏰ Scheduled: 10:40 AM IST');
  sendRandomPost();
});

// 12:20 PM IST = 6:50 UTC
cron.schedule('50 6 * * *', () => {
  console.log('⏰ Scheduled: 12:20 PM IST');
  sendRandomPost();
});

// 3:20 PM IST = 9:50 UTC
cron.schedule('50 9 * * *', () => {
  console.log('⏰ Scheduled: 3:20 PM IST');
  sendRandomPost();
});

// 7:25 PM IST = 13:55 UTC
cron.schedule('55 13 * * *', () => {
  console.log('⏰ Scheduled: 7:25 PM IST');
  sendRandomPost();
});

// ==================== STARTUP ====================
bot.launch().catch((err) => {
  console.error('❌ Bot failed to start:', err);
});

console.log('🤖 Pushpa 2 Channel Bot started!');
console.log(`📢 Channel: ${CHANNEL_USERNAME}`);
console.log(`🔗 Main Bot: ${MAIN_BOT_USERNAME}`);
console.log('⏰ Scheduled posts at (IST): 8:25AM, 10:40AM, 12:20PM, 3:20PM, 7:25PM daily');

// Test post 1 minute after startup
setTimeout(() => {
  console.log('🧪 Sending test post...');
  sendRandomPost();
}, 60000);

// ==================== GRACEFUL SHUTDOWN ====================
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});
