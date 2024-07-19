let encryptedWords = [];  

function encrypt() {  
    let inputText = document.getElementById('inputText').value;  
    let encryptedText = btoa(inputText);  
    document.getElementById('outputText').value = encryptedText;  
    encryptedWords.push(encryptedText);   
    updateEncryptedWordsList();  
    document.getElementById('inputText').value = ''; 
}  

function decrypt(encryptedText) {  
    let decryptedText = atob(encryptedText);   
    document.getElementById('outputText').value = decryptedText;  
}  

function saveToExcel() {  
    const worksheet = XLSX.utils.json_to_sheet(encryptedWords.map(word => ({ Palabra: word })));  
    const workbook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Palabras Encriptadas');  
    XLSX.writeFile(workbook, 'palabras_encriptadas.xlsx');  
    alert("Palabras encriptadas guardadas en 'palabras_encriptadas.xlsx'");  
}  

function updateEncryptedWordsList() {  
    const list = document.getElementById('encryptedWordsList');  
    list.innerHTML = '';  

    encryptedWords.forEach((word, index) => {  
        const listItem = document.createElement('li');  
        listItem.textContent = word;  
        listItem.onclick = () => decrypt(word); 
        list.appendChild(listItem);  
    });  
}  

function deleteEntry() {  
    const searchText = document.getElementById('deleteInput').value;  
    const encryptedSearchText = btoa(searchText);  
    const index = encryptedWords.findIndex(word => word === encryptedSearchText);  

    if (index !== -1) {  
        alert("Palabra encriptada borrada: " + encryptedWords[index]);  
        encryptedWords.splice(index, 1);  
    } else {  
        alert("No se encontró la palabra encriptada.");  
    }  
    
    document.getElementById('deleteInput').value = '';  
    updateEncryptedWordsList();  
}