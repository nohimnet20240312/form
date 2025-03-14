const title = document.querySelector('.main-title')
'use strict';

const submit = document.getElementById('submit')
const reset = document.getElementById('cancel')
const date = document.querySelector('#date');

const body = document.querySelector('body')
let required = ['full_name', 'email_address', 'date', 'comments'];
let requiredElements = []

required.forEach(el => {
    let element = document.getElementById(el);
    requiredElements.push(element)
})
console.log(requiredElements);

let warningPopup = `
<div class="popup">
Please fill this field
</div>

`
let emptyElements = []
let isClicked = false
submit.addEventListener('click', (e) => {
    emptyElements = []
    requiredElements.forEach((el, i) => {
        if (el.value == '') {
            emptyElements.push(el)
        }

    })
    if (emptyElements.length > 0) {
        e.preventDefault()
        alert('Please fill the required fields!!')
        emptyElements.forEach(el => {
            el.classList.add('border-red')

        })
    }
    else {
        const form = document.querySelector('form')
        const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: false,
        });
        form.dispatchEvent(submitEvent)
    }




})

body.addEventListener('click', (e) => {
    console.log(e.target);
    emptyElements.forEach(el => {
        if (e.target == el) {
            emptyElements.forEach(el => {
                el.classList.remove('border-red')
            })
        }
    })
})

reset.addEventListener('click', (e) => {

    emptyElements.forEach(el => {
        el.classList.remove('border-red')
    })


})
function addZero(format) {
    if (format < 10) {
        return `0${format}`
    }
    else {
        return format
    }
}
let t = new Date();
let preDefinedDate = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(t.getDate())}T${addZero(t.getHours())}:${addZero(t.getMinutes())}`
date.value = preDefinedDate;


class typeWriter {
    constructor(typeWords, el, speed, waitPeriod = 1) {
        const wordsUn = typeWords.split(',')
        const inTheMiddle = typeWords.split(':')
        let words = []
        let waitStr = ''
        for (let i = 0; i < waitPeriod; i++) {
            waitStr += ' '
        }

        wordsUn.forEach((el => {
            words.push(el.trim()[0].toUpperCase() + el.trim().slice(1, el.length) + waitStr)
        }))


        let i = 0
        let k = 0
        this.speed = speed

        el.textContent = '  '
        let reversing = false

        const typingAnimation = setInterval(() => {
            if (!reversing) {
                el.textContent += words[k][i]
                if (i === words[k].length - 1) {
                    reversing = true
                    return
                }
                i++
            }
        }, 180)

        const clearAnimation = setInterval(() => {
            if (reversing) {
                el.textContent = words[k].slice(0, i)
                if (i === 0) {
                    reversing = false
                    if (k === words.length - 1) {
                        k = 0
                        return
                    }
                    k++
                    return
                }
                i--;
            }
        }, 60);
    }

    speedUp() {
        this.speed -= 200
        console.log(this.speed);
    }

}

new
    typeWriter
    (" Hi Let's Get started! , fill the form, chat with me , explore", title, 100, 2)

