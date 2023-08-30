// PHONE CHECKER

// DOM - document object model

const phoneInput = document.querySelector('#phone_input')
const phoneCheck = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /\+996 \d{3} \d{2}-\d{2}-\d{2}/


phoneCheck.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }
    else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}


// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let index = 0
const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((item, i) => {
            if (item === event.target){
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

const Slider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContent.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
        }, 3000)
}
Slider(index)




// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, target, target2, isTrue) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const response = JSON.parse(request.response);
            if (isTrue) {
                target.value = (element.value / response.usd).toFixed(2);
                target2.value = (element.value / response.eur).toFixed(2);
            } else {
                target.value = (element.value * response.usd).toFixed(2);
                target2.value = (element.value * response.eur).toFixed(2);
            }
            if (element.value === '') {
                target.value = '';
                target2.value = '';
            }
        };
    };
};

converter(som, usd, eur, true);
converter(usd, som, eur, false);
converter(eur, som, usd, false);


// CARD SWITCHER

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
let count = 1;
const totalTasks = 200;

function loadTask(taskId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}

btnPrev.onclick = () => {
    count--
    if (count < 1) {
        count = totalTasks
    }
    loadTask(count)
};

btnNext.onclick = () => {
    count++
    if (count > totalTasks) {
        count = 1
    }
    loadTask(count)
}

loadTask(count)



fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        console.log('Posts:', posts)
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    })