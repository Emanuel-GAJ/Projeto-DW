import api from './api.js';

function createFileView(file) {
    const ul = document.querySelector('ul');

    const html = `<li>${file.name}</li>`;

    ul.insertAdjacentHTML('beforeend', html);
}

const files = await api.read('/files');

for (const file of files) {
    createFileView(file);
}