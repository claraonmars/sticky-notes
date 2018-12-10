console.log('working')

var notes =[];
var container = document.querySelector('.container');

var renderNote = function(){

    var note = document.createElement("div");
    note.classList.add("note");

    var title = document.createElement("input");
    title.classList.add('title_input');
    title.setAttribute('placeholder', 'Title');
    note.appendChild(title);

    var contentInput = document.createElement('textarea');
    contentInput.classList.add('content');
    contentInput.setAttribute('placeholder', 'Content');

    note.appendChild(contentInput);

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'x';
    note.appendChild(deleteBtn);

    container.appendChild(note);
}

document.querySelector('.add').addEventListener('click', renderNote);