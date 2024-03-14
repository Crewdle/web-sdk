import { IValueType } from 'crewdle';

import { send, User } from './index';

export interface IFile {
  name: string;
  type: string;
  path: string;
}

export function readFile(file: IFile, senderId: string, userId: string, timestamp: number) {
  const reader = new FileReader();
  const chat = document.getElementById('chat') as HTMLDivElement;
  const messageDate = new Date(timestamp);
  const messageDiv = document.createElement('div');
  chat.appendChild(messageDiv);
  autoScrollDown();

  reader.onload = () => {
    let [senderNameEl, senderClass] = senderId === userId ? ['<b>me</b>', ['message', 'outgoing']] : [`<b>${senderId}</b>`, ['message', 'incoming']];
    if (file.type.startsWith('image')) {
      messageDiv.innerHTML = `${senderNameEl} ${messageDate.toLocaleTimeString('en-US')}<br><img src="${reader.result}" />`;
    } else if (file.type.startsWith('video')) {
      messageDiv.innerHTML = `${senderNameEl} ${messageDate.toLocaleTimeString('en-US')}<br><video src="${reader.result}" controls></video>`;
    } else {
      messageDiv.innerHTML = `${senderNameEl} ${messageDate.toLocaleTimeString('en-US')}<br><a href="${reader.result}" download=${file.name} style="color: #fff">${file.name}</a>`;
    }
    messageDiv.classList.add(senderClass[0], senderClass[1]);
    autoScrollDown();
  };

  return reader;
}

export function renderTextMessage(id: string, message: string, senderId: string, timestamp: number, userId: string) {
  const chat = document.getElementById('chat') as HTMLDivElement;
  const messageDiv = document.createElement('div');
  messageDiv.id = id;
  const messageDate = new Date(timestamp);
  const isUserMessage = senderId === userId;

  const messageHTML = generateMessageHTML(message, senderId, id, messageDate, isUserMessage);

  messageDiv.innerHTML = messageHTML;
  messageDiv.classList.add('message', isUserMessage ? 'outgoing' : 'incoming');
  if (!isUserMessage) {
    chat.appendChild(messageDiv);
  } else {
    const ellipsisElement = document.createElement('button');
    ellipsisElement.classList.add('ellipsis-button');
    ellipsisElement.innerHTML = '<i class="fas fa-ellipsis-v"></i>';

    const messageActions = document.createElement('div');
    messageActions.classList.add('message-actions');
    messageActions.innerHTML = `
      <button class="button edit-message-btn" onclick="Crewdle.editMessage('${id}')">Edit</button>
      <button class="button delete-message-btn" onclick="Crewdle.deleteMessage('${id}')">Delete</button>
      `;

    const newMessageDiv = document.createElement('div');
    newMessageDiv.classList.add('message-container');
    newMessageDiv.appendChild(messageDiv);
    newMessageDiv.appendChild(ellipsisElement);
    newMessageDiv.appendChild(messageActions);
    chat.appendChild(newMessageDiv);
  }
  autoScrollDown();
}

export function generateMessageHTML(message: string, senderId: string, id: string, messageDate: Date, isUserMessage: boolean) {
  let messageHTML = `<b>${isUserMessage ? 'me' : senderId}</b>${messageDate.toLocaleTimeString('en-US')}<br>${linkify(message)}`;
  return messageHTML;
}

export function updateUserList(users: User[]) {
  const userListElement = document.getElementById('user-list') as HTMLUListElement;
  userListElement.innerHTML = '';

  users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.classList.add('user-item');
      userItem.textContent = user.senderId;

      const statusIndicator = document.createElement('span');
      statusIndicator.classList.add('indicator');
      statusIndicator.classList.add(
          user.isOnline ? 'online' : 'offline'
      );

      userItem.prepend(statusIndicator);
      userListElement.appendChild(userItem);
  });
}

export function removeMessage(id: string) {
  document.getElementById(id)?.closest('.message-container')?.remove();
  document.getElementById(id)?.remove();
}

export function updateMessage(id: string, message: string, senderId: string, timestamp: number) {
  const messageDiv = document.getElementById(id);
  messageDiv!.innerHTML = generateMessageHTML(message, senderId, id, new Date(timestamp), true);
}

export function getMessage() {
  const input = document.getElementById('message') as HTMLInputElement;
  const message = input.value;
  return message
}

export function clearMessage() {
  const input = document.getElementById('message') as HTMLInputElement;
  input.value = '';
}

export function setInputListener() {
  const messageInput = document.getElementById('message');
  if (messageInput) {
    messageInput.addEventListener('keypress', (event) => {
      input(event);
    })
  }
}

export function editText(initialMessage: string) {
  const input = document.getElementById('message') as HTMLInputElement;
  input.setRangeText(initialMessage);
  input.selectionStart = input.selectionEnd = input.value.length;
  input.focus();
}

function input(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    send();
  }
}

function autoScrollDown () {
  setTimeout(() => {
    const chat = document.getElementById('chat') as HTMLDivElement;
    chat.scrollTop = chat.scrollHeight;
  }, 1);
}

function linkify(message: string) {
  const urlRegex = /((?:https?|ftp):\/\/[\S]+)/gi;
  const emailRegex = /([^\s@]+@[^\s@]+\.[^\s@]+)/gi;

  const linkifiedText = message
    .replace(urlRegex, (match) =>
      `<a href="${match}" target="_blank">${match}</a>`
    )
    .replace(emailRegex, (match) =>
      `<a href="mailto:${match}">${match}</a>`
    );

  return linkifiedText;
}
