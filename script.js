const buttons = document.querySelectorAll('button');
const interface = document.getElementById('display');

function enterKey(){
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            evaluateExpression();
        }
    });
}
enterKey();
buttons.forEach(button => {
    button.addEventListener('click', () => {
    if(button.textContent !== 'C' && button.textContent !== '←' && button.textContent !== '='){
        interface.value = interface.value + button.textContent;
    }
    if(button.textContent === 'C'){
        interface.value = '';
        alert('Calculator cleared');

    }
    if(button.textContent === '←'){
        deleteDigit();
    }
    if(button.textContent === '='){
        evaluateExpression();
    }
    interface.scrollLeft = interface.scrollWidth;

});
});

function evaluateExpression(){
    try{
        let rawInput = interface.value;
        let sanistizedInput = sanitizeInput(rawInput);
        console.log(sanistizedInput);

        /*if(interface.value === 'Infinity' || interface.value === '-Infinity'){  
            throw new Error('Cannot divide by zero');
        }*/

        if(!isValidExpression(sanistizedInput)){
            throw new Error('Invalid expression');
        }

        interface.value = Function('return ' + sanistizedInput)();

        
    }
    catch (error) {
        interface.value = 'Error';
        alert(error.message);
        interface.value = '';   
            
    }
}
    
function deleteDigit(){
        const interface = document.getElementById('display');
        interface.value = interface.value.slice(0, -1);
}

function sanitizeInput(input){
    return input.replace(/(?:^|[^0-9\.])0+/g, '$1').replace(/(\.\d*)\./g, '$1');
}

function isValidExpression(input){
    const regExp = /^[0-9+\-*/().\s]+$/;
    return regExp.test(input);
}

