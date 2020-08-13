import { Server } from 'mosca'
import { unpack } from "msgpack";

var settings = {
  id: 'broker',
  port: 1883,
  stats: false,
}

var server = new Server(settings)

server.on('ready', function () {
  console.log('ready')
})

server.on('clientConnected', (client) => {
  console.log('Connected! Client ID :>> ', client.id)
})

server.on('clientDisconnected', (client) => {
  console.log('Disconnected! client ID :>> ', client.id)
})

server.on('published', (packet, client) => {
  if (packet.topic.startsWith(`$SYS/${settings.id}/`)) {
    // Systemove zpravy vypisujeme v celku
    console.log(`${'#'.repeat(50)}\n`, 'packet', packet, `\n${'#'.repeat(50)}`)
  } else {
    console.log('topis:', packet.topic, '| ID:', packet.messageId, '| message:', unpack(packet.payload))
  }
})
