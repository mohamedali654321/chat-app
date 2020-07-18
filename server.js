const express=require('express');
const http=require('http');
const path=require('path');
const app=express();
const server=http.createServer(app);


app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
res.sendFile(__dirname + '/index.html');

})
const io=require('socket.io')(server);
io.on('connection',socket=>{
  console.log('new user connected');
  socket.on('message',msg=>{
      console.log(msg);
      socket.broadcast.emit('message',msg);
  })

    socket.on('disconnect',()=>{
        console.log('user is disconnected');
    })
})


server.listen(process.env.PORT |5000,()=>{
    console.log('server running on port 3000');
})