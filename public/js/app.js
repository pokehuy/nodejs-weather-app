console.log('javascript file is loaded!')

/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

/* fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.place)
            console.log(data.forecast)
        }
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')                  // can not set the location value by using .value here, location value must be set inside eventlistener
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading..' //innerHTML can be used instead of textContent property
    messageTwo.textContent = ''             //innerHTML can be used instead of textContent property
    const location = search.value           
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
        }
    })
})
})

/* const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)
}) */