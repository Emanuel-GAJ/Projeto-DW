// Função para pegar os dados na rota /arquivos.
async function getFiles() {
    const response = await fetch('/arquivos');
    const data = await response.json();
    return data;
}

// Função para montar a tabela com os dados obtidos na rota /arquivos.
async function buildTable() {
    
    const files = await getFiles();

    const tbody = document.querySelector('#file-table-body');

    files.forEach(file => {
        
        let icon = '';

        if (file.type === 'file') {
            icon = '<i class="fa-solid fa-file text-primary"></i>'
        } else {
            icon = '<i class="fa-regular fa-folder-open text-warning"></i>'
        }

        tbody.innerHTML += `
            <tr>
                <td>${file.name}</td>
                <td>${icon}</td>
                <td class="text-info">${file.size}</td>
                <td>${file.date}</td>
            </tr>
        `;

    });
}


// Função para montar tabela com path recebido por input. (POST)
// async function buildTableByPath() {
//     const search = document.querySelector('#button-search');
    
//     search.addEventListener('click', async () => {
//         const path = document.querySelector('.input-group input')
//         console.log(path.value);
//         const response = await fetch('/arquivos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ path: path.value })
//         });

//         const data = await response.json();

//         const tbody = document.querySelector('#file-table-body');

//         tbody.innerHTML = '';

//         data.forEach(file => {
//             let icon = '';

//             if (file.type === 'file') {
//                 icon = '<i class="fa-solid fa-file text-primary"></i>'
//             } else {
//                 icon = '<i class="fa-regular fa-folder-open text-warning"></i>'
//             }

//             tbody.innerHTML += `
//                 <tr>
//                     <td>${file.name}</td>
//                     <td>${icon || file.type}</td>
//                     <td class="text-info">${file.size}</td>
//                     <td>${file.date}</td>
//                 </tr>
//             `;
//         });
//     });
// }

// Executar a função buildTable.
buildTable();

// Executar a função buildTableByPath.
//buildTableByPath();