async function getFiles() {
    
 const response = await fetch('http://localhost:3000/arquivos');
 
 const data = await response.json();

 return data;
    }
    
function renderFiles() {
    
 const tbody = document.querySelector('#file-table-body');

 getFiles().then(files => {
    
  let output = '';
    
  files.forEach(file => {

    output += `
    <tr>
        <td>${file.name}</td>
        <td>${file.path}</td>
        <td>${file.extension}</td>
        <td>${file.size}</td>
    </tr>
    `;
    });
    
    tbody.innerHTML = output;
    });
    }
    
    renderFiles();