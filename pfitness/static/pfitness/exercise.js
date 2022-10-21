document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#listbtn').forEach(button => {
        button.onclick = () => {
            update_list(button);
        }
    })
})



function update_list(button) {
    csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    fetch(`/manage_list`, {
        method: 'PUT',
        body : JSON.stringify({
            action: button.dataset.action,
            ex_pk: button.dataset.pk
        }),
        credentials: 'same-origin',
        headers: {
            'x-csrftoken': csrf_token
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