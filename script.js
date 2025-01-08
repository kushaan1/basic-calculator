const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {const interface = document.getElementById('display');
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
    interface.scrollLeft = interface.scrollWidth;

});
});


    
function deleteDigit(){
        const interface = document.getElementById('display');
        interface.value = interface.value.slice(0, -1);
}

function sanitizeInput(input){
    return input.replace(/(?:^|[^0-9\.])0+/g, '$1').replace(/(\.\d*)\./g, '$1');
}

function isValidExpression(input){
    const regExp = /^[-+*/.0-9]*$/;
    return regExp.test(input);
}

