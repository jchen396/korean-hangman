const hanger = document.querySelectorAll('#hanger path');
const hangBody = document.querySelectorAll('#hanger-body path');
const hangulRegex = /[\u3131-\uD79D]/ugi;
let textArea = document.querySelector('#guess-input');
let errorText = document.querySelector('#error-text');

// Check SVG values and display on console
for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`);
}

hangBody.forEach((element, index) =>{
    console.log(`letter ${index+1} is ${element.getTotalLength()}`);
})

// Check for language type
textArea.addEventListener("input", () => {
    console.log(String(textArea.value).match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g));
    if(String(textArea.value).match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g)){
        errorText.style.opacity = "1";
        errorText.innerHTML = "This is korean";
        setTimeout(() => {
            errorText.style.opacity = "0"
        }, 2000)
    }else{
        errorText.style.opacity = "1";
        errorText.innerHTML = "*Please enter Korean characters";
        setTimeout(() => {
            errorText.style.opacity = "0"
        }, 2000)
    }
})