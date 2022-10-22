document.addEventListener('DOMContentLoaded', () => {
    const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    document.querySelectorAll('#listbtn').forEach(button => {
        button.onclick = () => {
            update_list(button, csrf_token);
        }
    })
})



function update_list(button, token) {    
    fetch(`/manage_list`, {
        method: 'PUT',
        body : JSON.stringify({
            action: button.dataset.action,
            ex_pk: button.dataset.pk
        }),
        credentials: 'same-origin',
        headers: {
            'x-csrftoken': token
        }
    })
    if (button.dataset.action === 'add') {
        button.dataset.action = 'remove';
        button.removeAttribute('class');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('mb-4');
        button.innerHTML = 'Remove from your exercises';
    }
    else {
        button.dataset.action = 'add';
        button.removeAttribute('class');
        button.classList.add('btn');
        button.classList.add('btn-success');
        button.classList.add('mb-4');
        button.innerHTML = 'Add to your exercises';
    }
}