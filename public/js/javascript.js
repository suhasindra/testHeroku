
console.log('Javascript loaded')
// fetch('http://puzzle.mead.io/puzzle').then((resp)=>{
//     resp.json().then((data)=>{
//         console.log(data)
//     })
// })
const form = document.querySelector('form')
const search = document.querySelector('input')
const success = document.querySelector('#message-success')
const failure = document.querySelector('#message-failure')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(search.value)
    success.textContent = ''
    failure.textContent = ''
if(!search.value) {
    console.log('Please enter a search')
}

fetch("http://localhost:3000/weather?address="+ search.value).then( (res)=>{
    res.json().then(data => {
    if(data.error)
        failure.textContent = "Error in address"
    else
        success.textContent = data.forecast + ' at '+ data.place
    })
})
})