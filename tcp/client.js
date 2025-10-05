import net from "net"

function testTCPMessage(message) {
   return new Promise((resolve) => {
      // handshake to create a tcp connection with the server
      // unlike UDP, TCP is connection-oriented
      // if the connection is successful, the callback is called
      const client = net.createConnection({ port: 4000 }, () => {
         const start = Date.now()
         client.write(message)

         client.on("data", (data) => {
            // round-trip time
            const rtt = Date.now() - start
            console.log(`Received back: ${data.toString().slice(0, 50)}...`)
            console.log(`RTT: ${rtt} ms, Message length: ${message.length}`)
            client.end()
            resolve()
         })
      })
   })
}

async function run() {
   await testTCPMessage("Hello TCP!") // tiny message
   await testTCPMessage("A".repeat(100000)) // huge message
}

run()
