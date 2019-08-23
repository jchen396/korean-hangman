const hanger = document.querySelectorAll('#hanger path');

for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`)
}