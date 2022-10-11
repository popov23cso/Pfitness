document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#addnote').addEventListener('click', add_note);
})


function add_note()
{
    const content = document.querySelector('#notecontent');
    if (content.value === '') {
        return;
    }
    const notelist = document.querySelector('#notelist');
    const newitem = document.createElement('li');
    newitem.innerHTML = `${content.value} <br> Just now`;
    newitem.classList.add('list-group-item');
    notelist.insertBefore(newitem, notelist.firstChild);
    csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    fetch(`/add_note`, {
        method: 'PUT',
        body : JSON.stringify({
            content: content.value
        }),
        credentials: 'same-origin',
        headers: {
            'x-csrftoken': csrf_token
        }
    })

}