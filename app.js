let mainText = document.querySelector(".main-text");

let textAppear = () => {    
    mainText.classList.add('text-appear');
}

window.addEventListener("load", textAppear);
