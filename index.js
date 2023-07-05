//Node server which will handle socket io connection.


/*const io =require('socket.io')(5500)

const users={};
io.on('connection',(socket) =>{     // io.on means it listen anodll the sockets.it listen all new user who joined
    socket.on('new-user-joined', (name) =>{  
       console.log("New user", name);                                    // if new user is joined what happen with this.
        users[socket.id]=name;                  // when new user joined then assign a new key which is its name.
        socket.broadcast.emit('user-joined',name);   // broadcast.emit method is used when new user joined and all member
                                                 // reached this alert that Harry is joined.
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message:message,name: users[socket.id]})
});
})*/
const express=require('express')
const app=express()
const http=require('http'). createServer(app)
 const PORT= process.env.PORT ||3000

http.listen(PORT, () =>{
    console.log(`port is starting ${PORT}`)
})
app.use(express.static(__dirname +'/public'))

app.get('/',(req,res) =>{
    res.sendFile(__dirname+'/index.html')
})
  //socket
const io =require('socket.io')(http)

io.on('connection',(socket) =>{
    console.log('connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)          // socket.broadcast will send the msg every one who is join the chat
    })
})
