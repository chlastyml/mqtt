import { connect } from 'mqtt'

const client = connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  setTimeout(() => {
    console.log('TICK!')
    client.subscribe('topic', (err, data) => {
      if (err) {
        console.log('err', err)
        return
      }
      client.publish('topic', 'Hello mqtt')
    })
  }, 1000)
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic: ', topic)
  console.log('message: ', message.toString())
  // client.end()
})
