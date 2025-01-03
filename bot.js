const { ChatOllama } = require("@langchain/ollama");


const model = new ChatOllama({
  model: "llama3.2:1b",  
});

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')


const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'Rhish'
})

const RANGE_GOAL = 1 // get within this radius of the player

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  const defaultMove = new Movements(bot)

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message !== 'come') return
    const target = bot.players[username]?.entity
    if (!target) {
      bot.chat("I don't see you !")
      return
    }
    const { x: playerX, y: playerY, z: playerZ } = target.position

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
  })
})

bot.on('chat', async (username, message) => {
  if (username === bot.username) return
  if (message.includes('/')) return
  if (message!=='come'){
    const result = await model.invoke([
    ["system", "You are a minecraft bot. you are currently playing inside a minecraft world as a player named 'Rhishh'. Answer very shortly and keep it simple "],
    ["human", message]
    ]);
    bot.chat(result.content)
  }
})