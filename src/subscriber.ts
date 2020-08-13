import { connect } from 'mqtt'
import { unpack } from "msgpack";

const baseUrl = process.env.URL

if(!baseUrl) {
  throw new Error('Enviromental variable "URL" is not set')
}

const url = baseUrl.startsWith('mqtt://') ? baseUrl : `mqtt://${baseUrl}`

const client = connect(url, { clientId: 'subscriber' })

client.on('connect', function () {
  console.log(`Connection to ${baseUrl} is succesful`)
  client.subscribe('#')
})

client.on('message', function (topic, message, packet) {
  // console.log('packet', packet)
  console.log(topic.padEnd(40), ':>>', JSON.stringify(unpack(message)))
})
