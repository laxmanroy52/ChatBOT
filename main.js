'use strict';

let msg = document.getElementById('msg');
let submit = document.getElementById('submit');
let response = document.getElementsByClassName('response')[0];

//import all data
import {data} from '/data.js';

let send = () => {
  if (msg.value != '') {
  // get question
  let human = document.createElement('p');
  let text = document.createTextNode('');
  human.appendChild(text);
  response.appendChild(human);
  human.innerHTML = '🙎 ' + msg.value;
  let value = msg.value;
  
  //Generate answer
  setTimeout(function() {
  let bot = document.createElement('span');
  let ans = document.createTextNode('');
  let newMsg = value.toLowerCase().replace(/[^\w\s]/gim, '');
  newMsg = newMsg.replace(/\s+/gm, ' ');
  newMsg = (newMsg.slice(-1, newMsg.length) == ' ') ? newMsg.slice(0, -1) : newMsg;
  bot.appendChild(ans);
  response.appendChild(bot);
  
  //search and response
  bot.innerText = '🤖  ';
  if (data[newMsg] == undefined) {
   again: for (let item of Object.keys(data)) {
     let regex = new RegExp(item, "gim");
     console.log(newMsg.search(regex));
      if (newMsg.search(regex) != -1) {
        bot.innerText += data[item];
        continue again;
      }
    }
    if (bot.innerText == '') {
        bot.innerText = "I'm sorry, but \"" + value + "\" doesn't seem to be a coherent question or statement. Can you please provide more context or clarify your inquiry? I'll do my best to assist you if you can provide a clear question or topic for discussion.";
      }
  } else {
    bot.innerText = `🤖  ${data[newMsg]}`;
  }
//for developer
  console.log('[' + newMsg.length + ']' + newMsg);
  }, 500);
  
  //clear your input value
  msg.value = '';
  }
}

submit.addEventListener('click', send);



//Voice recognition

let micro = document.getElementById('voice');
let speech = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speech) {
  let recog = new webkitSpeechRecognition();
  
  micro.addEventListener('click', function() {
    recog.start();
    micro.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:30px;color: red"></i>';
  });
  
  recog.addEventListener('result', function(e) {
    let trans = e.results[0][0].transcript;
    msg.value = trans;
    micro.innerHTML = '<i class="fa fa-microphone" style="font-size:30px;color:red"></i>';
  });
} else {
  console.log('Your browser\' not support microphone');
}