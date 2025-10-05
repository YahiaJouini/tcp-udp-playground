import net from "net"

const server = net.createServer((socket) => {
   // sends back whatever it receives
   // if the message is too big, it might be received in chunks
   // unlike UDP where the message is either received fully or not at all
   socket.on("data", (data) => {
      console.log(data.byteLength)
      if (data.byteLength > 65000) {
         console.log("message is too big it will be chunked")
      }
      socket.write(data)
   })
})

server.listen(4000, () => console.log("TCP server running on port 4000"))
