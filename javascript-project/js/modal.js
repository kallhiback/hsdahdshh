// MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) closeModal()
}

let modalShown = false;

function handleClick() {
    if (!modalShown) {
        window.addEventListener("scroll", function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                modalShown = true
                openModal()
                window.removeEventListener("scroll", arguments.callee)
            }
        })
    }
}

handleClick()

setTimeout(() => {openModal()},10000)


// POST DATA

const  form = document.querySelector('form')

// const postData = () => {
//     form.addEventListener('submit', (event) => {
//         event.preventDefault()
//
//         const request = new XMLHttpRequest()
//         request.open('post', 'server.php')
//         request.setRequestHeader('Content-type', 'application/js')
//
//         const formData = new FormData(form)
//         const obj = {}
//         formData.forEach((item,i) => {
//             obj[i] = item
//         })
//         const json = JSON.stringify(obj)
//         request.send(json)
//     })
// }
//
// postData(form)


const postData = (url, data) => {
    const response = fetch(url,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: data
    })
    return response
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData
        const obj = {}
        formData.forEach((item, i) => {
            obj[i] = item
        })
        const json = JSON.stringify(obj)
        if (window.location.pathname === 'javascript-project/index.html') {
            postData('server.php', json)
        } else {
            postData('../server.php', json)
        }
    }
}

bindPostData(form)