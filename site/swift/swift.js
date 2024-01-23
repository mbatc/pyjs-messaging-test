
var onMessage = (msg) => {
  var consoleLogArea = document.getElementById('console-log');

  console.log(msg);

  // Append the message to the messages area
  consoleLogArea.innerHTML += '<p>' + msg + '</p>';

  // Scroll to the bottom of the console log area to show the latest messages
  consoleLogArea.scrollTop = consoleLogArea.scrollHeight;

  return msg; // Echo the message
}

var onOpen = (eventData) => {
  console.log(eventData);
}

var onClose = (eventData) => {
  console.log(eventData);
}

window.parent._bindSwiftMessageHandlers(onOpen, onClose, onMessage);
