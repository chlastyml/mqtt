import { connect } from 'mqtt'

const client = connect('mqtt://localhost', { clientId: 'subscriber' })

client.on('connect', function () {
  client.subscribe('$SYS/#')
})

client.on('message', function (topic, message, packet) {
  // console.log('packet', packet)
  console.log(topic, ':>>', message.toString())
})
