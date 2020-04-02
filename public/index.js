// Setup socket
// connect to the socket server
// var socket = io.connect()

// Variables
// var currentView = [];
var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// When page first loads
window.addEventListener('load', () => {
    // console.log("page loaded")

    // get the funny submissions
    getSubmissions("funny")
    // console.log(currentView)

    // // change button colors
    // document.getElementById('funnyBtn').style.color = "whitesmoke"
    // document.getElementById('funnyBtn').style.backgroundColor = "var(--color-blue)"
    // document.getElementById('sadBtn').style.color = "var(--color-blue)"
    // document.getElementById('sadBtn').style.backgroundColor = "white"
    // document.getElementById('beautifulBtn').style.color = "var(--color-blue)"
    // document.getElementById('beautifulBtn').style.backgroundColor = "white"
})

// When about is pressed
document.getElementById('aboutBtn').addEventListener('click', () => {
    // console.log('about pressed')

    // show about modal
    document.getElementById('aboutModal').style.display = "flex"
})

// When about close is pressed
document.getElementById('aboutCloseBtn').addEventListener('click', () => {
    // console.log('add close pressed')

    // hide about modal
    document.getElementById('aboutModal').style.display = "none"

})

// When funny is pressed
document.getElementById('funnyBtn').addEventListener('click', () => {
    // console.log('funny pressed')

    // get the funny submissions
    getSubmissions("funny")

    // // change button colors
    // document.getElementById('funnyBtn').style.color = "whitesmoke"
    // document.getElementById('funnyBtn').style.backgroundColor = "var(--color-blue)"
    // document.getElementById('sadBtn').style.color = "var(--color-blue)"
    // document.getElementById('sadBtn').style.backgroundColor = "white"
    // document.getElementById('beautifulBtn').style.color = "var(--color-blue)"
    // document.getElementById('beautifulBtn').style.backgroundColor = "white"
    
})

// When sad is pressed
document.getElementById('sadBtn').addEventListener('click', () => {
    // console.log('sad pressed')

    // get the sad submissions
    getSubmissions("sad")

    // // change button colors
    // document.getElementById('sadBtn').style.color = "whitesmoke"
    // document.getElementById('sadBtn').style.backgroundColor = "var(--color-blue)"
    // document.getElementById('funnyBtn').style.color = "var(--color-blue)"
    // document.getElementById('funnyBtn').style.backgroundColor = "white"
    // document.getElementById('beautifulBtn').style.color = "var(--color-blue)"
    // document.getElementById('beautifulBtn').style.backgroundColor = "white"
})

// When beautiful is pressed
document.getElementById('beautifulBtn').addEventListener('click', () => {
    // console.log('beautiful pressed')

    // get the beautiful submissions
    getSubmissions("beautiful")

    // // change button colors
    // document.getElementById('beautifulBtn').style.color = "whitesmoke"
    // document.getElementById('beautifulBtn').style.backgroundColor = "var(--color-blue)"
    // document.getElementById('sadBtn').style.color = "var(--color-blue)"
    // document.getElementById('sadBtn').style.backgroundColor = "white"
    // document.getElementById('funnyBtn').style.color = "var(--color-blue)"
    // document.getElementById('funnyBtn').style.backgroundColor = "white"
})

// When add is pressed
document.getElementById('addBtn').addEventListener('click', () => {
    // console.log('add pressed')

    // show add modal
    document.getElementById('addModal').style.display = "flex"

})

// When submit is pressed
document.getElementById('submitAddBtn').addEventListener('click', () => {
    // console.log('submit pressed')

    // get access to form
    var form = document.getElementById('addForm')

    // check if any of the required fields are blank
    if(form.elements["story"].value !== ""){
        // console.log(form.elements["type"].value)
        // console.log(form.elements["location"].value)
        // console.log(form.elements["story"].value)
        // console.log(new Date())

        const newEntry = {
            section: form.elements["type"].value,
            date: new Date(),
            content: form.elements["story"].value
        }
        const options ={
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
                body:JSON.stringify(newEntry)
            }

        fetch('/submission/create', options).then(result => result.json()).then(data => {
            // console.log(data)
        }).catch(err => {
            return err
        })

        // hide add modal
        document.getElementById('addModal').style.display = "none"

    }else{
        alert("Looks like you left a required field blank.  Make sure to complete the entire form.")
    }
    
    
    // console.log(document.getElementById('addForm').elements["type"].value)

    

})

// When add close is pressed
document.getElementById('addCloseBtn').addEventListener('click', () => {
    // console.log('add close pressed')

    // hide add modal
    document.getElementById('addModal').style.display = "none"

})




/////////// HELPER FUNCTIONS ///////////
// get type submissions
function getSubmissions(type){
    // remove exisiting divs
    d3.selectAll('.list_card').remove()

    // get new divs
    fetch('/submission/' + type).then(result => result.json().then(data => {
        data.doc.forEach(element => {
            // currentView.push(element)

            // for each element (aka submission), show the content
            showContent(element);
        });
    }))
}

// show content of each submission
function showContent(el){
    // console.log(el)
    var d = new Date(el.date);
    
    // access list container
    var card = d3.select('#list').append('div')
        .attr("class", "list_card")

    var heading = card.append('div')
        .attr("class", "list_heading")

    heading.append('h6')
        .attr("class", "list_date")
        .text(dayNames[d.getDay()] + ", " + d.toLocaleDateString())

    heading.append('h6')
        .attr("class", "list_location")
        .text("New York, NY")

    var content = card.append('div')
        .attr("class", "list_content")

    content.append('p')
        .text("Something " + el.section + " that happened today was... " + el.content)
        // .text(el.content)

}

