import dgram from "dgram"

function testUDPMessage(message) {
   return new Promise((resolve) => {
      // no need to create a connection in UDP
      // we just send a datagram to the server
      const client = dgram.createSocket("udp4")
      const start = Date.now()
      const buffer = Buffer.from(message)

      client.send(buffer, 5000, "127.0.0.1", (err) => {
         if (err) throw err
      })

      client.on("message", (msg) => {
         const rtt = Date.now() - start
         console.log(`Received back: ${msg.toString().slice(0, 50)}...`)
         console.log(`RTT: ${rtt} ms, Message length: ${message.length}`)
         client.close()
         resolve()
      })
   })
}

async function run() {
   await testUDPMessage("Hello UDP!")
   //    max size of a UDP message is 65kB
   await testUDPMessage("B".repeat(65000))
}

run()
