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
    }
    else {
        button.dataset.action = 'add';
    }
}