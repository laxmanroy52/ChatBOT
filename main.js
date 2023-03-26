'use strict';

let msg = document.getElementById('msg');
let submit = document.getElementById('submit');
let response = document.getElementsByClassName('response')[0];

//import all data





let data = {
  // Phrases to start talking
  hi: " Hello there!",
  hello: " Hi.",
  'whats up': "I am very well.",
  'how are you': "I am very well. Thanks, for asking",
  
  
  // Phrase to personal information
  'who are you': "I am Laxman.",
  'whats your name': "My name is Laxman roy.",
  'what is your name': "My name is Laxman roy.",
  'where are you from': "I am from Chirirbandar, Dinajpur, Bangladesh",
  'your father name': "My father name is Parimol roy",
  'who is your father': "My father is Parimol roy",
  'your mother name': "My mother name is Champa rani",
  'who is your mother': "My mother is Champa rani.",
  'your brother name': "I have two brothers, including me we are three brothers. My elder brother name is Palash Roy and younger brother name is Molin Roy.",
  'your elder brother name': "My elder brother's name is Polash Roy",
  'who is your elder brother': "My elder brother's is Polash Roy",
  'your younger brother name': "My younger brother name is Molin roy",
  'who is your younger brother': "My younger brother is Molin roy",
  'are you married': "No, I am not married yet",
  'do you love someone': "Yes, I love my family.",
  'do you love any girl': "No, I don't love any girl's.",
  'do you have a girlfriend': "No, because I don't like these",
  'how old are you': "My old is: 19",
  'your height': "My height is 5.7 foot.",
  'your weight': "My weight is: 55kg.",
  
  
  
  // Phrase to talking chatbot power
  'can you help me': "Of course, I'd be happy to help! What can I assist you with? Please feel free to ask me any question or let me know what you need help with, and I'll do my best to provide you with the information or guidance you're looking for.",
  
 'are you help me': "Yes, I am here to help you! Please let me know what you need assistance with, and I will do my best to provide you with the information or guidance you're looking for. Whether you have a question or need advice on a particular topic, I am here to support you to the best of my abilities.",
}

export {data};





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
