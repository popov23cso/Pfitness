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

function calculate_calories(event) {
    event.preventDefault();
    const type = document.querySelector('#calorieselect');
    let goal = type.options[type.selectedIndex].text;
    let weight = document.querySelector('#weight').value;
    if (goal === 'Bulking') {
        let result = (weight * 35) + 250;
        document.querySelector('#result').innerHTML = result;
    }
    else if (goal === 'Maintaining') {
        let result = weight * 35;
        document.querySelector('#result').innerHTML = result;
    }
    else if (goal === 'Losing weight') {
        let result = (weight * 35) - 250;
        document.querySelector('#result').innerHTML = result;
    }
    else {
        alert('select a goal!');
    }
}

function calculate_protein(event) {
    event.preventDefault();
    let weight = document.querySelector('#pweight').value;
    document.querySelector('#presult').innerHTML = weight * 1.8;

}