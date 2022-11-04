document.addEventListener('DOMContentLoaded', () => {
    change_mode();
    document.querySelector('#modes').addEventListener('click', save_mode);
})

function save_mode() {
    const button = document.querySelector("#modes");
    if (button.innerHTML === '🌙') {
        localStorage.setItem('mode', 'light');
    }
    else {
        localStorage.setItem('mode', 'dark');
    }
    change_mode();
}


function change_mode() {
    let mode = localStorage.getItem('mode');
    if (mode === null) { 
        mode = 'dark';
    }
    const button = document.querySelector("#modes");
    if (mode === 'light') {
        button.innerHTML = '☀️';
        button.style.backgroundColor = 'white';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';

        if (location.pathname === '/programs') {
            adjust_item_color(['program'], 'light');
            }
        if (location.pathname === '/calculators') {
            adjust_item_color(['calculator'], 'light');
            }
        if (location.pathname === '/notebook') {
            adjust_item_color(['addnote', 'notecontent', 'note', 'notepages'], 'light');
            }
        if (location.pathname === '/exercises' || location.pathname === '/foods') {
            adjust_item_color(['type'], 'light');
            }}
        

    else {
        button.innerHTML = '🌙';
        button.style.backgroundColor = 'black';
        document.body.style.backgroundColor = 'rgb(21, 32, 43)';
        document.body.style.color = 'white';

        if (location.pathname === '/programs') {
            adjust_item_color(['program'], 'dark');
        }
        if (location.pathname === '/calculators') {
            adjust_item_color(['calculator'], 'dark');
        }
        if (location.pathname === '/notebook') {
            adjust_item_color(['addnote', 'notecontent', 'note', 'notepages'], 'dark');
        }
        if (location.pathname === '/exercises' || location.pathname === '/foods') {
            adjust_item_color(['type'], 'dark');
            }}

}

function adjust_item_color(ids, mode)
{
    Array.from(ids).forEach(id => {
    if (mode === 'dark') {
        document.querySelectorAll(`#${id}`).forEach(item => {
        item.style.backgroundColor = 'white';
        item.style.color = 'rgb(21, 32, 43)';
        })}
    else{
        document.querySelectorAll(`#${id}`).forEach(item => {
        item.style.backgroundColor = 'rgb(21, 32, 43)';
        item.style.color = 'white';
        })}
    })
}

