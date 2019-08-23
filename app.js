let textAppear = () => {
    let mainText = document.querySelector(".main-text");
    mainText.classList.add('text-appear');
    console.log("works");
}

window.addEventListener("load", textAppear);
