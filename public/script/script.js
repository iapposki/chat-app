import "/socket.io/socket.io.js";
var socket = io()
var user = "anonymous user"
document.querySelector("#btn-login").addEventListener("click", onClickFunction)



async function onClickFunction() {
    user = prompt("Enter your User Name : ");
    var login_user = document.getElementById("user");
    login_user.innerHTML = user + " is online";
    // myPromise = new Promise(function(resolve,reject){
    //     setTimeout(() => {resolve("okk")}, 1000)
    //     // resolve("okk")
    // });
    // temp = document.getElementById("user");
    // temp.innerHTML = await myPromise;

    var userData = await fetch("https://api.github.com/users/" + user);
    var userDataKaData = await userData.json();
    // or
    // fetch("https://api.github.com/users/" + user).then((response) => response.json()).then((data) => {console.log(data)});

    // directly console logging userData won't be in a readable format, json converts the data into readable format for the console.
    console.log(userDataKaData);
}


var input = document.getElementById("messageInput")
var chatDisplay = document.querySelector(".chat-display")
var typing = document.getElementById("typing")
var send = document.querySelector("#btn-snd")

input.addEventListener("keydown",function(){
    typing.style.visibility = "visible";
});
input.addEventListener("keyup",function(){
    typing.style.visibility = "hidden"
}); 
input.addEventListener("keypress", function (e){
    if (e.key === "Enter"){
        message()
    }
})

send.addEventListener("click", message)

function message(){

    if (input.value){
        var data = {"msg": input.value, "userName": user}
        // console.log(data)
        socket.emit("chat message", data);
        input.value = "";
    }

}

socket.on('chat message', function (data) {
    // console.log(data)
    var mess = document.createElement("div");
    mess.className = "right";
    mess.innerHTML = data.userName + " : " + data.msg ;
    chatDisplay.appendChild(mess);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    
})