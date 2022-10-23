const content = document.querySelector('#notecontent');
const notelist = document.querySelector('#notelist');
const recentblock = document.querySelector('#recents');

document.addEventListener('DOMContentLoaded', () => {
    recentblock.style.display = 'none';
    document.querySelector('#addnote').addEventListener('click', add_note);
})


function add_note()
{
    if (content.value === '') {
        return;
    }
    recentblock.style.display = 'block';
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