let container = {};
let api = 'https://api.openai.com/v1/completions';
let api_key = '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';

let headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + api_key,
};

const genComponent = (msg, flag = false) => {
  let msg_box = document.createElement('div');
  let msg_dialog = document.createElement('div');

  msg_box.classList.add('msg_box');
  if (!flag) {
    msg_box.classList.add('sender');
  }
  msg_dialog.classList.add('msg_dialog');
  msg_dialog.innerText = msg;
  msg_box.appendChild(msg_dialog);
  return msg_box;
};

const onResponse = data => {
  // alert(data.choices[0])
  const response = data.choices[0].text;
  const e = genComponent(response, true);
  container.display.appendChild(e);
};

const sendRequest = msg => {
  let post = {
    model: 'text-davinci-002',
    prompt: msg,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ['You:'],
  };

  fetch(api, {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .then(data => {
      onResponse(data);
    })
    .catch(error => {
      console.log('Failed to send message');
    });
  console.log('sent data');
};

const sendMessage = () => {
  const message = container.msgInput.value;
  let element = genComponent(message);
  container.display.appendChild(element);
  sendRequest(message);
};

window.onload = () => {
  container.sendBtn = document.querySelector('#sendBtn');
  container.msgInput = document.querySelector('input');
  container.display = document.querySelector('.display');
  container.sendBtn.addEventListener('click', sendMessage);
};
