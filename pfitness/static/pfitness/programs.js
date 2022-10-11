document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#program').forEach(button => {
        button.onclick = () => {
            show_content(button);
        }
    })
})


function show_content(content) {
    let programs = ['cardio', 'bodybuilding', 'strength'];
    programs.forEach(program => {
        if (program === content.dataset.type) {
            document.querySelector(`#${content.dataset.type}`).style.display = 'block';
        }
        else {
            document.querySelector(`#${program}`).style.display = 'none';
        }
    })
}

