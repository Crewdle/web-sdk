import { IObjectStoreBucket } from "@crewdle/web-sdk";
import { IFile, generateMessageHTML, readFile, renderTextMessage } from "../chat/helpers";

// Render a message as either a text message or a file
export function renderMessage(objectStore: IObjectStoreBucket, id: string, userId: string, senderId: string, message: string, timestamp: number, file?: IFile) {
  if (file) {
    return renderFile(objectStore, file, userId, senderId, timestamp);
  }

  renderTextMessage(id, message, senderId, timestamp, userId);
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

  return input.value;
}

export function clearMessage() {
  const input = document.getElementById('message') as HTMLInputElement;
  input.value = '';
}

export function getFile(event: Event) {
  return (event.target as HTMLInputElement).files![0];
}

// Read a file and render it as a message
async function renderFile(objectStore: IObjectStoreBucket, file: IFile, userId: string, senderId: string, timestamp: number) {
  const reader = readFile(file, senderId, userId, timestamp);
  // Get the file from the object store using its path
  const fileObject = await objectStore.get(file.path);
  reader.readAsDataURL(fileObject);
}

