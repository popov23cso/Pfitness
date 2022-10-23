document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#calcbtn').forEach(button => {
        button.onclick = () => {
            update_weight(button);
        }
    })
    //document.querySelector('#lvlbtn').addEventListener('click', update_level);
    document.querySelectorAll('#selectbtn').forEach(button => {
        button.onclick = () => {
            update_level(button);
        }
    })
})


const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

function update_weight(button)
{
    const current = document.querySelector(`#${button.dataset.type}value`);
    const edit = document.createElement('input');
    edit.type = 'number';
    edit.value = current.innerHTML;
    current.parentNode.replaceChild(edit, current);
    const save = document.createElement('button');
    save.innerHTML = 'Save';
    save.classList.add('btn');
    save.classList.add('btn-success');
    button.parentNode.replaceChild(save, button);

    save.addEventListener('click', () => {    
        current.innerHTML = edit.value;
        edit.parentNode.replaceChild(current, edit);
        fetch(`/profile_update/${button.dataset.action}/${button.dataset.userid}`, {
            method: 'PUT',
            body : JSON.stringify({
                value: current.innerHTML
            }),
            credentials: 'same-origin',
            headers: {
                'x-csrftoken': csrf_token
            }
        })
        save.parentNode.replaceChild(button, save);
    })
}


function update_level(button)
{
    const current = document.querySelector(`#${button.dataset.type}value`);
    const edit = document.createElement('select');
    if (button.dataset.type === 'lvl') {
        var levels = ['beginner', 'intermediate', 'experienced'];
    }
    else {
        var levels = ['cardio', 'bodybuilding', 'strength'];
    }
    for (let i = 0; i < levels.length; i++) {
        const op1 =  document.createElement('option');
        op1.text = levels[i];
        edit.appendChild(op1);
    }
    current.parentNode.replaceChild(edit, current);

    const save = document.createElement('button');
    save.innerHTML = 'Save';
    save.classList.add('btn');
    save.classList.add('btn-success');
    button.parentNode.replaceChild(save, button);

    save.addEventListener('click', () => {
        current.innerHTML = edit.value;
        edit.parentNode.replaceChild(current, edit);
        fetch(`/profile_update/${button.dataset.action}/${button.dataset.userid}`, {
            method: 'PUT',
            body : JSON.stringify({
                value: current.innerHTML
            }),
            credentials: 'same-origin',
            headers: {
                'x-csrftoken': csrf_token
            }
        })
        save.parentNode.replaceChild(button, save);
    })
}