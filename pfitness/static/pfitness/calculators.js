document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#calculator').forEach(button => {
        button.onclick = () => {
            show_content(button);
        }
    })
  document.querySelector('#calorieform').addEventListener('submit', calculate_calories);
  document.querySelector('#proteinform').addEventListener('submit', calculate_protein);

    
})


function show_content(content) {
    let calcs = ['calories', 'protein'];
    calcs.forEach(calc => {
        if (calc === content.dataset.type) {
            document.querySelector(`#${content.dataset.type}`).style.display = 'block';
        }
        else {
            document.querySelector(`#${calc}`).style.display = 'none';
        }
    })
}

const weight = document.querySelector('#weight')
const type = document.querySelector('#calorieselect');
function calculate_calories(event) {
    event.preventDefault();
    let goal = type.options[type.selectedIndex].text;
    if (goal === 'Bulking') {
        let result = (weight.value * 35) + 250;
        document.querySelector('#result').innerHTML = result;
    }
    else if (goal === 'Maintaining') {
        let result = weight.value * 35;
        document.querySelector('#result').innerHTML = result;
    }
    else if (goal === 'Losing weight') {
        let result = (weight.value * 35) - 250;
        document.querySelector('#result').innerHTML = result;
    }
    else {
        alert('select a goal!');
    }
}

const pweight = document.querySelector('#pweight')
function calculate_protein(event) {
    event.preventDefault();
    document.querySelector('#presult').innerHTML = pweight.value * 1.8;
}