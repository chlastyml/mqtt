import { connect } from 'mqtt'
import { unpack } from "msgpack";
import config from "./config";

if(!config.url) {
  throw new Error('Enviromental variable "URL" is not set')
}

const url = config.url.startsWith('mqtt://') ? config.url : `mqtt://${config.url}`

const client = connect(url, { clientId: 'subscriber' })

client.on('connect', function () {
  console.log(`Connection to ${config.url} is succesful`)
  client.subscribe('#')
})

client.on('message', function (topic, message, packet) {
  // console.log('packet', packet)
  console.log(topic.padEnd(40), ':>>', JSON.stringify(unpack(message)))
})
