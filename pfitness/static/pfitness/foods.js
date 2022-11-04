document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#type').forEach(button => {
        button.onclick = () => {
            get_foodtype(button.dataset.type);
        }
    })
    
    setTimeout(() => {
        get_foodtype('protein');
    }, 500); 
})


const loader = document.querySelector('#loader');
const foodlist = document.querySelector('#foodlist');
function get_foodtype(type) {
    foodlist.innerHTML = '';
    loader.style.display = 'block';
    foodlist.style.display = 'none';
    fetch(`food/${type}`)
    .then(response => response.json())
    .then(foodlist => {
    foodlist.forEach(food => {
        render_food(food);
    });
    });
    setTimeout(() => {  
    loader.style.display = 'none';
    foodlist.style.display = 'block';
    }, 250);
}


function render_food(food) {
    const record = document.createElement('div');
    record.classList.add('record');
    record.classList.add('mb-3');
    record.innerHTML = `${food['name']} - ${food['amount']}g <br>`;
    
    foodlist.append(record);
}
