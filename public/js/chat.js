const socket = io()
socket.on('countUpdated', (counter) => {
  console.log('Count has been updated', counter)
})

document.querySelector('#increment').addEventListener('click', () => {
  socket.emit('increment')
})