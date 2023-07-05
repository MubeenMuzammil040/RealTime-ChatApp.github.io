/*const socket=io('http://localhost:5500');
const form= document.getElementById('send-container');
const message=document.getElementById('msgInp');
const messagecontainer=document.querySelector(".container");

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messagecontainer.append(messageElement);

}

// make connection with server from user side

    const name=prompt("Enter your name");
    socket.emit('new-user-joined', (name));
  
    socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right')
    });*/
    
    const socket=io();
    
    let name;
    let textarea=document.querySelector('#textarea')
    let messagearea=document.querySelector('.container')
    do{
name=prompt('please Enter your name:')
    }while(!name)
    textarea.addEventListener('keyup',(e)=>{
        if(e.key==='Enter'){
            sendMessage(e.target.value)
        }
    })
    function sendMessage(message){
        let msg={
            user:name,
            message:message
    
        }
        appendMessage(msg,'incoming')
        textarea.value='' ;
        scrollToBottom();

        //send to server
        socket.emit('message',msg)
    }
     function appendMessage(msg, type){
        let mainDiv=document.createElement('div')
        let className= type
        mainDiv.classList.add(className,'message')
         
        let markup= `
        <h4>${msg.user} </h4>
        <p> ${msg.message}</p>
        `
         mainDiv.innerHTML= markup
         messagearea.appendChild(mainDiv)

     }
     //Recieve msg
     socket.on('message',(msg)=>{
        appendMessage(msg,'outgoing');
        scrollToBottom()
     })

     function scrollToBottom(){
        messagearea.scrollTop=messagearea.scrollHeight
     }