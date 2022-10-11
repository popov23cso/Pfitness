document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#record').forEach(record => {
        record.onclick = () => {
            redirect_exercise(record.dataset.name);
        }
    })
})


function redirect_exercise(ex) {
    window.location.href = `/exercise/${ex}`;
}