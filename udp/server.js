import dgram from "dgram"
const server = dgram.createSocket("udp4")

server.on("message", (msg, rinfo) => {
   // the server does not know who sent the message until it receives it
   // unlike TCP, UDP is connectionless
   console.log(rinfo)
   // after receiving a message, the server can send a response back to the client by the information sent with the message
   server.send(msg, rinfo.port, rinfo.address)
})

server.bind(5000, () => console.log("UDP server running on port 5000"))
