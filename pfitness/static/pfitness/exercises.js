document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#type').forEach(button => {
        button.onclick = () => {
            get_excercises(button.dataset.type);
        }
    })
    
    setTimeout(() => {
        get_excercises(document.querySelector('#userlevel').innerHTML);
    }, 500); 
})


const loader = document.querySelector('#loader');
const exlist = document.querySelector('#exlist');
function get_excercises(type) {
    exlist.innerHTML = '';
    loader.style.display = 'block';
    exlist.style.display = 'none';
    fetch(`exercises/${type}`)
    .then(response => response.json())
    .then(exlist => {
    exlist.forEach(ex => {
        render_exercises(ex);
    });
    });
    setTimeout(() => {  
    loader.style.display = 'none';
    exlist.style.display = 'block';
    }, 250);
}


function render_exercises(exercise) {
    const record = document.createElement('div');
    record.classList.add('record');
    record.classList.add('mb-3');
    record.innerHTML = `${exercise['name']} <br>
                        Level: ${exercise['level']}`;
    record.addEventListener('click', () => {
        window.location.href = `/exercise/${exercise["name"]}`
    })
    exlist.append(record);
}
