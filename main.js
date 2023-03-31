'use strict';

let defaultMsg = document.getElementById('default');
let msg = document.getElementById('msg');
let submit = document.getElementById('submit');
let response = document.getElementsByClassName('response')[0];

//include all data
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

// add response function
let send = () => {
  // generate time
  let time = new Date();
  time = time.toLocaleTimeString('en-us', {hour12: true, hour: 'numeric', minute: 'numeric'}).toLowerCase();

  if (msg.value != '') {
  // clear default message
  defaultMsg.style = 'margin-top: 10px; transition: .3s';
  defaultMsg.innerHTML = '<i class="fa fa-handshake fa-beat" style="font-size: 40px; color: red"></i>';
  
  // get question
  let human = document.createElement('p');
  let text = document.createTextNode('');
  human.appendChild(text);
  response.appendChild(human);
  human.addEventListener('click', listen);
  human.addEventListener('dragstart', copyText);
  human.setAttribute('draggable', 'true');
  human.innerHTML = '<div class="human_response">' + msg.value + '<i class="time">' + time + '</i></div>';
  let value = msg.value;
  
  //Generate answer
  setTimeout(function() {
  let bot = document.createElement('p');
  let ans = document.createTextNode('');
  let newMsg = value.toLowerCase().replace(/[^\w\s]/gim, '');
  newMsg = newMsg.replace(/\s+/gm, ' ');
  newMsg = (newMsg.slice(-1, newMsg.length) == ' ') ? newMsg.slice(0, -1) : newMsg;
  bot.appendChild(ans);
  response.appendChild(bot);
  bot.setAttribute('class', 'chatbot');
  bot.addEventListener('click', listen);
  bot.addEventListener('dragstart', copyText);
  bot.setAttribute('draggable', 'true');
  //search and response
  if (data[newMsg] == undefined) {
   again: for (let item of Object.keys(data)) {
     let regex = new RegExp(item, "gim");
      if (newMsg.search(regex) != -1) {
        bot.innerHTML += data[item];
        continue again;
      }
      if (Object.keys(data)[Object.keys(data).length - 1] == item && bot.innerHTML != '') {
        bot.innerHTML += `<i class="time"> ${time} </i>`;
      }
    }
    if (bot.innerHTML == '') {
        bot.innerHTML += " I'm sorry, but \"" + value + "\" doesn't seem to be a coherent question or statement. Can you please provide more context or clarify your inquiry? I'll do my best to assist you if you can provide a clear question or topic for discussion. <i class=\"time\">" + time + "</i>";
      }
  } else {
    bot.innerHTML = `${data[newMsg]} <i class="time">${time}</i>`;
  }
//for developer
  console.log('[' + newMsg.length + ']' + newMsg);
  // auto scroll
  if (document.body.scrollHeight > window.screen.height - 113) {
  window.scrollTo(0, document.body.scrollHeight);
  }
  }, 500);
  
  //clear your input value
  msg.value = '';
  }
  //auto scroll
  if (document.body.scrollHeight > window.screen.height - 113) {
  window.scrollTo(0, document.body.scrollHeight);
  }
}

submit.addEventListener('click', send);

//Voice to text recognition
let count = true;
let micro = document.getElementById('voice');
let speech = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speech) {
  let recog = new webkitSpeechRecognition();
  recog.lang = 'en';
  micro.addEventListener('click', function() {
    if (count) {
    count = false;
    recog.start();
    micro.innerHTML = '<i class="fa fa-ellipsis fa-flip" style="font-size:20px;color: #fff"></i>';
    } else {
      count = true;
      recog.stop();
      micro.innerHTML = '<i class="fa fa-microphone" style="font-size:20px;color: #fff"></i>';
    }
  });
  
  recog.addEventListener('speechstart', function() {
    micro.innerHTML = '<i class="fa fa-ellipsis fa-shake" style="font-size:20px;color: #fff"></i>';
  })
  
  recog.addEventListener('result', function(e) {
    let trans = e.results[0][0].transcript;
    msg.value = trans;
    micro.innerHTML = '<i class="fa fa-microphone" style="font-size:20px;color:#fff"></i>';
  });
  
  
  recog.addEventListener('speechend', function() {
    micro.innerHTML = '<i class="fa fa-microphone" style="font-size:20px;color:#fff"></i>';
    count = true;
  })
  recog.addEventListener('end', function() {
    micro.innerHTML = '<i class="fa fa-microphone" style="font-size:20px;color:#fff"></i>';
    count = true;
  })
} else {
  console.log('Your browser\'s not support microphone');
}

//text to voice recognition
function listen() {
 if ('speechSynthesis' in window) {
  if (!speechSynthesis.speaking) {
    let utterance = new SpeechSynthesisUtterance();
    let synth = window.speechSynthesis;
   utterance.text = this.innerText.slice(0, this.innerText.length - 8);
    synth.speak(utterance);
  } else {
    speechSynthesis.cancel();
  }
 } else {
   console.log('Sorry, your browser doesn\'t support text to speech');
 }
 let myElement = this;
 if (myElement.className == 'chatbot') {
   myElement.style.backgroundColor = '#585965';
 } else {
   myElement.children[0].style.backgroundColor = '#40746a';
 }
 setTimeout(function() {
   if (myElement.className == 'chatbot') {
   myElement.style.backgroundColor = '#40414F';
 } else {
   myElement.children[0].style.backgroundColor = '#005C4B';
 }
 }, 100);
}
//copy system
let notification = document.getElementById('notification');
let header = document.querySelector('header').clientHeight;
function copyText() {
    let copyElement = this;
    navigator.clipboard.writeText(copyElement.innerText.slice(0, copyElement.innerText.length - 8));
    notification.style.opacity = '.9';
    
    if (copyElement.className == 'chatbot') {
      copyElement.style.backgroundColor = '#585965';
    } else {
      copyElement.children[0].style.backgroundColor = '#40746a';
    }
    setTimeout(function() {
      notification.style.opacity = '0';
      
      if (copyElement.className == 'chatbot') {
      copyElement.style.backgroundColor = '#40414F';
    } else {
      copyElement.children[0].style.backgroundColor = '#005C4B';
    }
    }, 1500);
 }
