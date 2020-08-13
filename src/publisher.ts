import { connect } from 'mqtt'
import { pack } from "msgpack";
import config from './config'

const settings = { clientId: 'publisher' }
const client = connect(config.url, settings)

function makeid() {
  const length = Math.floor(Math.random() * 8 + 1)
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function makeTopic() {
  const length = Math.floor(Math.random() * 5)
  let result = []
  for (let i = 0; i < length; i++) {
    result.push(makeid())
  }
  return result.join('/')
}

// const topic = 'house/switch2'

const sendMessage = (message: any) => {
  if (client.connected) {
    client.publish(makeTopic(), pack(message))
  } else {
    console.log('Client is not connected')
    // throw new Error('Client is not connected')
  }
}

const sendMessageDelayed = () => {
  setTimeout(() => {
    const message = {
      time: new Date(Date.now()).toISOString(),
      content: 'Hello from publisher!',
    }
    sendMessage(message)
    console.log('send message', JSON.stringify(message))
    sendMessageDelayed()
  }, Math.round(Math.random() * 4000) + 1000)
}

const testSendMessages = () => {
  client.on('connect', (packet) => {
    console.log(`Connected to ${config.url}`)
    sendMessageDelayed()
    // packet is CONNACK message
    // setInterval(() => {
    //   const message = {
    //     time: new Date(Date.now()).toISOString(),
    //     content: 'Hello from publisher!',
    //   }
    //   sendMessage(message)
    //   console.log('send message', JSON.stringify(message))
    // }, 1000)
  })
}
testSendMessages()

// const sendMessageAsSeparateClient = (message: any) => {
//   const client = connect('mqtt://localhost', settings)

//   client.on('connect', () => {
//     client.publish(topic, JSON.stringify(message))
//     console.log(message.time, 'Message Sent')
//     client.end()
//   })
// }

// const testSendSeparateMessages = () => {
//   for (let i = 0; i < 10; i++) {
//     setTimeout(() => {
//       const message = {
//         order: i,
//         time: new Date(Date.now()).toISOString(),
//         content: 'Hello from publisher!',
//       }

//       sendMessageAsSeparateClient(message)
//     }, i * 2000)
//   }
// }

// client.on('connect', function () {
//   setInterval(function () {
//     const message = {
//       time: new Date(Date.now()).toISOString(),
//       content: 'Hello from publisher!',
//     }

//     client.publish(topic, JSON.stringify(message))
//     console.log(message.time, 'Message Sent')
//   }, 5000)
// })


// const message = {
//   time: new Date(Date.now()).toISOString(),
//   content: 'Hello from publisher!',
// }

// const payload = pack(message)
// console.log('payload', payload)

// const data = unpack(payload)
// console.log('data', data)
