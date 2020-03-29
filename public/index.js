// Setup socket
// connect to the socket server
var socket = io.connect()


// When the funny tab is clicked
document.getElementById('funnyBtn').addEventListener('click', () => {
    console.log('pressed funny')

    fetch('/submission/').then(result => result.json()).then(data => {
        console.log(data)

    })
})

// When the sad tab is clicked
document.getElementById('sadBtn').addEventListener('click', () => {
    console.log('pressed sad')
})

// When the beautiful tab is clicked
document.getElementById('beautifulBtn').addEventListener('click', () => {
    console.log('pressed beautiful')
})