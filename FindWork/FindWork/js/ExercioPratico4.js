const apiUrl = "http://localhost:8085/api"; 
var estoque = [];
var opcoes =  '1';
var nivel = '';
var totalDisponiveis = '';

    document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('div1').hidden = true
    document.getElementById('opcoes').addEventListener('change', function () {
        opcoes = document.getElementById('opcoes').value
        console.log(opcoes)
        console.log(totalDisponiveis)
    });

});

function limpar() {
   // document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("ano_publicacao").value = "";
    document.getElementById("numero_exemplares").value = "";
    document.getElementById("titulo").focus();
}

function novolivro(estoque) {

    if (teste()) {
        let produto =
        {
          //  "codigo": estoque.length,
            "titulo": document.getElementById("titulo").value,
            "autor": document.getElementById("autor").value,
            "ano_publicacao": parseInt(document.getElementById("ano_publicacao").value),
            "numero_exemplares": parseInt(document.getElementById("numero_exemplares").value)
        };
        fetch(`${apiUrl}/biblioteca.php`, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.success || data.console.error);
            limpar();
    });
        
        estoque[estoque.length] = produto;
    }
}
function alteralivro() {
    if (teste()) {
        let achou = false;
        estoque.forEach(item => {
            if (item.autor == document.getElementById("autor").value || item.titulo == document.getElementById("titulo").value) {
             //   document.getElementById("codigo").value = item.codigo;
                document.getElementById("autor").value = item.autor;
                document.getElementById("titulo").value = item.titulo;
                document.getElementById("ano_publicacao").value = item.anopub;
                document.getElementById("numero_exemplares").value = item.disponiveis;
                achou = true;
            }
        });
        if (!achou) {
            alert("Não Possuimos este Livro!");
            limpar();
        }
    }
}
function salvar(estoque) {
    if (teste()) {
        let produto =
        {
          //  "codigo": document.getElementById("codigo").value,
            "autor": document.getElementById("autor").value,
            "titulo": document.getElementById("titulo").value,
            "ano_publicacao": parseInt(document.getElementById("ano_publicacao").value),
            "numero_exemplares": parseInt(document.getElementById("numero_exemplares").value)
        };

        estoque[document.getElementById("codigo").value] = produto;
        limpar();

    }
}

console.log(estoque);

function excluirlivro(estoque) {

    let produto =
    {
        //"codigo": document.getElementById("codigo").value,
        "autor": document.getElementById("autor").value,
        "titulo": document.getElementById("titulo").value,
        "ano_publicacao": parseInt(document.getElementById("ano_publicacao").value),
        "numero_exemplares": parseInt(document.getElementById("numero_exemplares").value)
    };

    estoque[document.getElementById("codigo").value] = produto;
    let index = estoque[document.getElementById("codigo").value];
    estoque.splice(index, 1);
    //console.log(estoque);      
    limpar();

}

function relatorio(estoque) {

    let lista = document.getElementById("tabelaRetorno");
    lista.innerHTML = "";
    
    if (opcoes == '1') {
        estoque.sort((a, b) => a.autor.localeCompare(b.autor));
        for (let i = 0; i < estoque.length; i++) {
            let nivel = estoque[i].disponiveis;  // Certifique-se de acessar o valor corretamente
                let cellClass = '';
                    if (nivel >= 0 && nivel <= 10) {
                        cellClass = 'red-cell';
                    } else if (nivel >= 11 && nivel <= 50) {
                        cellClass = 'orange-cell';
                    } else if (nivel >= 51 && nivel <= 100) {
                        cellClass = 'yellow-cell';
                    } else if (nivel > 100) {
                        cellClass = 'blue-cell';
                    }
                    lista.innerHTML += `<tr style="text-align: center;">
                        <td>${estoque[i].autor}</td>
                        <td>${estoque[i].titulo}</td>
                        <td>${estoque[i].ano_publicacao}</td>
                        <td class="${cellClass}">${estoque[i].numero_exemplares}</td>
                    </tr>`;    
                                                  }
    let totalDisponiveis = estoque.reduce((accumulator, item) => {
        return accumulator + item.numero_exemplares;
        }, 0);
       console.log(totalDisponiveis);
       document.getElementById("totalDisponiveis").textContent = `Total de Livros disponíveis: ${totalDisponiveis}`;
         
       document.getElementById('div1').hidden = false
       limpar();
    //return false;
}

    if (opcoes == '2') {
        estoque.sort((a, b) => a.titulo.localeCompare(b.titulo));
            for (let i = 0; i < estoque.length; i++) {
            let nivel = estoque[i].numero_exemplares;  // Certifique-se de acessar o valor corretamente
            let cellClass = '';
                if (nivel >= 0 && nivel <= 10) {
                    cellClass = 'red-cell';
                } else if (nivel >= 11 && nivel <= 50) {
                    cellClass = 'orange-cell';
                } else if (nivel >= 51 && nivel <= 100) {
                    cellClass = 'yellow-cell';
                } else if (nivel > 100) {
                    cellClass = 'blue-cell';
                }
                    lista.innerHTML += `<tr style="text-align: center;">
                    <td>${estoque[i].autor}</td>
                    <td>${estoque[i].titulo}</td>
                    <td>${estoque[i].ano_publicacao}</td>
                    <td class="${cellClass}">${estoque[i].numero_exemplares}</td>
                     </tr>`;           
                     let totalDisponiveis = estoque.reduce((accumulator, item) => {
                        return accumulator + item.numero_exemplares;
                        }, 0);
                       console.log(totalDisponiveis);
                       document.getElementById("totalDisponiveis").textContent = `Total de Livros disponíveis: ${totalDisponiveis}`;
                
                        }
                       document.getElementById('div1').hidden = false
                       limpar();
    };

    

    if (opcoes == '3') {
        estoque.sort((a, b) => {
            if (a.ano_publicacao !== b.ano_publicacao) {
                return a.ano_publicacao - b.ano_publicacao
            } });
        for (let i = 0; i < estoque.length; i++) {
            let nivel = estoque[i].numero_exemplares;  // Certifique-se de acessar o valor corretamente
                let cellClass = '';
                if (nivel >= 0 && nivel <= 10) {
                    cellClass = 'red-cell';
                } else if (nivel >= 11 && nivel <= 50) {
                    cellClass = 'orange-cell';
                } else if (nivel >= 51 && nivel <= 100) {
                    cellClass = 'yellow-cell';
                } else if (nivel > 100) {
                    cellClass = 'blue-cell';
                }
                  lista.innerHTML += `<tr style="text-align: center;">
                    <td>${estoque[i].autor}</td>
                    <td>${estoque[i].titulo}</td>
                    <td>${estoque[i].ano_publicacao}</td>
                    <td class="${cellClass}">${estoque[i].numero_exemplares}</td>
                </tr>`;
                }
                let totalDisponiveis = estoque.reduce((accumulator, item) => {
                    return accumulator + item.numero_exemplares;
                    }, 0);
                   console.log(totalDisponiveis);
                   document.getElementById("totalDisponiveis").textContent = `Total de Livros disponíveis: ${totalDisponiveis}`;
            
                    
                   document.getElementById('div1').hidden = false
                   limpar();
                }
    if (opcoes == '4') {
        estoque.sort((a, b) => {
            if (b.anopub !== a.ano_publicacao) {
                return b.ano_publicacao - a.ano_publicacao
            }
        });
        for (let i = 0; i < estoque.length; i++) {
            let nivel = estoque[i].numero_exemplares;  // Certifique-se de acessar o valor corretamente  
                let cellClass = '';
                if (nivel >= 0 && nivel <= 10) {
                    cellClass = 'red-cell';
                } else if (nivel >= 11 && nivel <= 50) {
                    cellClass = 'orange-cell';
                } else if (nivel >= 51 && nivel <= 100) {
                    cellClass = 'yellow-cell';
                } else if (nivel > 100) {
                    cellClass = 'blue-cell';
                }
                  lista.innerHTML += `<tr style="text-align: center;">
                    <td>${estoque[i].autor}</td>
                    <td>${estoque[i].titulo}</td>
                    <td>${estoque[i].ano_publicacao}</td>
                    <td class="${cellClass}">${estoque[i].numero_exemplares}</td>
                </tr>`;
                }
    let totalDisponiveis = estoque.reduce((accumulator, item) => {
        return accumulator + item.numero_exemplares;
        }, 0);
       console.log(totalDisponiveis);
       document.getElementById("totalDisponiveis").textContent = `Total de Livros disponíveis: ${totalDisponiveis}`;

        
       document.getElementById('div1').hidden = false
       limpar();

     }
     };

    function teste() {
    if (document.getElementById("titulo").value == '' ||
        document.getElementById("autor").value == '' ||
        document.getElementById("ano_publicacao").value == '' ||
        document.getElementById("numero_exemplares").value == '' || document.getElementById("numero_exemplares").value < 0) {
        alert("Não deixe nenhum capo vazio ou negativo!")
        return false

    } else {
        return true
    }
}
