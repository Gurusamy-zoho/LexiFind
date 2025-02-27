

document.getElementById("btn").addEventListener('click', function() {
    let value = document.getElementById("inputBox").value.trim().replace(/\s+/g, "");  
    if (!value) {
        alert("Please enter a valid word");
        return;
    }
    if (!/^[A-Za-z]+$/.test(value)) {
        alert("Please enter a valid word with only alphabets.");
        return;
    }

    let xhr = new XMLHttpRequest();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            let resultDiv = document.getElementById("resultDiv");
            resultDiv.innerHTML = ""; 

            for (let i = 0; i < response.length; i++) {
                let data = response[i];
                let separateCard = document.createElement("div");
                separateCard.classList.add("separateCard");

            let meaningStoreVariable = "";
                for (let j = 0; j < data.meanings.length; j++) {
                    let meaning = data.meanings[j];
                    meaningStoreVariable += `<p>${meaning.partOfSpeech}</p>`;

                    for (let k = 0; k < meaning.definitions.length; k++) {
                        let definition = meaning.definitions[k];
                        meaningStoreVariable += `<p>${definition.definition}</p>`;

                        if (definition.example) {
                            meaningStoreVariable += `<p>Example: ${definition.example}</p>`;
                        }
                    }
                }

            let phoneticsStoreVariable = "";
                for (let l = 0; l < data.phonetics.length; l++) {
                    let ph = data.phonetics[l];
                    if (ph.audio) {
                        phoneticsStoreVariable += `<p>Phonetics: <audio controls><source src="${ph.audio}" type="audio/mpeg"></audio></p>`; 
                    }
                }

            let sourceStoreVariable = "";
                if (data.sourceUrls) { 
                    for (let m = 0; m < data.sourceUrls.length; m++) {
                        sourceStoreVariable += `<p>Source: <a href="${data.sourceUrls[m]}" target="_blank">${data.sourceUrls[m]}</a></p>`;
                    }
                }

            separateCard.innerHTML = `
                    <h3>${data.word}</h3>
                    ${phoneticsStoreVariable}
                    ${meaningStoreVariable}
                    ${sourceStoreVariable}
                `;

            resultDiv.appendChild(separateCard);
            }
        }else {
            resultDiv.innerHTML = `<p style="color: red;">No Definitions Found. Sorry pal, we couldn't find definitions for the word you were looking for.</p>`;
        }
    };

    xhr.send(); 
});
