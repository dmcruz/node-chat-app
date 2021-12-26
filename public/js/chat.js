const socket = io()
socket.on('countUpdated', (counter) => {
  console.log('Count has been updated', counter)
})

document.querySelector('#increment').addEventListener('click', () => {
  socket.emit('increment')
})

socket.on('chat-event', (message) => {
  document.querySelector('#message-panel').innerHTML += `<i>${message}</i><br/>`
})
socket.on('receiveMessage', (message, username) => {
  console.log(`${username}: ${message}`)
  document.querySelector('#message-panel').innerHTML += `<b>${username}</b>: ${message}<br/>`
})
document.querySelector('#frmChat').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.elements.txtUsername.value
  const message = e.target.elements.txtMessage.value
  socket.emit('sendMessage', message, username)
})