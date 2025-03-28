const apiBaseUrl = 'http://localhost:8085/FindWorkApi/';

async function fetchApi(endpoint, method, data = null) {
    const response = await fetch(apiBaseUrl + endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : null
    });
    const result = await response.json();
    document.getElementById('output').innerText = JSON.stringify(result, null, 2);
}





// EMPRESA
function getEmpresa() {
    fetchApi('empresa_api.php', 'GET');
}

function createEmpresa() {

    let empresa = {
        "razao_social":document.getElementById("razao").value,
        "descricao": document.getElementById("descricao").value,
        "endereco": document.getElementById("endereco").value,
        "telefone":document.getElementById("telefone").value,
        "email":document.getElementById("email").value,
        "site":document.getElementById("site").value,
        "rede_social":document.getElementById("rede").value,
    };
        fetch(`${apiUrl}/empresa_api.php`, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(empresa)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.success || data.console.error);
        });
/*
    fetchApi('empresa_api.php', 'POST', {
        razao_social: 'Empresa Teste Ltda',
        descricao: 'Empresa fictícia criada para testes de API no sistema FindWork',
        endereco: 'Av. Teste, 123, Centro, São Paulo - SP',
        telefone: '1198765432',
        email: 'empresa@teste.com.br',
        site: 'www.empresa-teste.com.br',
        rede_social: 'facebook.com/empresa-teste',
        senha: 'senha1234'
    });*/
}

function alterarEmpresa(){
    
} 


function updateEmpresa() {
    fetchApi('empresa_api.php', 'PUT', {
        id: 1,
        razao_social: 'Empresa Atualizada Ltda',
        descricao: 'Descrição atualizada da empresa fictícia para novos testes.',
        endereco: 'Rua Atualizada, 456, Bairro Novo, São Paulo - SP',
        telefone: '1199998888',
        email: 'empresa_atualizada@teste.com.br',
        site: 'www.empresa-atualizada.com.br',
        rede_social: 'twitter.com/empresa-atualizada',
        senha: 'senha12345'
    });
}

function deleteEmpresa() {
    fetchApi('empresa_api.php?id=1', 'DELETE');
}

// VAGA
function getVaga() {
    fetchApi('vaga_api.php', 'GET');
}

function createVaga() {
    fetchApi('vaga_api.php', 'POST', {
        titulo: 'Desenvolvedor Frontend',
        descricao: 'Vaga para desenvolvedor frontend com experiência em React.js, JavaScript, HTML e CSS.',
        requisitos: 'Experiência mínima de 2 anos com desenvolvimento frontend e domínio de Git.',
        salario: 5500.50,
        localizacao: 'São Paulo, SP',
        tipo_contratacao: 'CLT',
        beneficios: 'Vale transporte, Vale refeição, Seguro de vida',
        data_limite: '2025-06-30 23:59:59',
        qtd_vaga: 5,
        jornada_trabalho: '40 horas semanais',
        empresa_id: 1
    });
}

function updateVaga() {
    fetchApi('vaga_api.php', 'PUT', {
        id: 1,
        titulo: 'Desenvolvedor Backend',
        descricao: 'Vaga para desenvolvedor backend com experiência em Node.js e banco de dados relacionais.',
        requisitos: 'Experiência com Node.js, Express.js, MongoDB e APIs REST.',
        salario: 7000.00,
        localizacao: 'São Paulo, SP',
        tipo_contratacao: 'PJ',
        beneficios: 'Home office, Vale alimentação, Bônus de performance',
        data_limite: '2025-07-31 23:59:59',
        qtd_vaga: 3,
        jornada_trabalho: '40 horas semanais',
        empresa_id: 1
    });
}

function deleteVaga() {
    fetchApi('vaga_api.php?id=1', 'DELETE');
}

// CANDIDATURA
function getCandidatura() {
    fetchApi('candidatura_api.php', 'GET');
}

function createCandidatura() {
    fetchApi('candidatura_api.php', 'POST', {
        vaga_id: 1,
        candidato_id: 1,
        soube_vaga: 'LinkedIn',
        experiencia: 'S',
        data_candidatura: '2025-03-26 10:00:00'
    });
}

function updateCandidatura() {
    fetchApi('candidatura_api.php', 'PUT', {
        id: 1,
        soube_vaga: 'Facebook',
        experiencia: 'N',
        data_candidatura: '2025-03-26 14:00:00'
    });
}

function deleteCandidatura() {
    fetchApi('candidatura_api.php?id=1', 'DELETE');
}

// CANDIDATO
function getCandidato() {
    fetchApi('candidato_api.php', 'GET');
}

function createCandidato() {
    fetchApi('candidato_api.php', 'POST', {
        nome: 'João da Silva',
        cpf: '12345678901',
        data_nascimento: '1990-05-15 00:00:00',
        email: 'joao.silva@teste.com',
        telefone: '1198765432',
        endereco: 'Rua Teste, 123, São Paulo - SP',
        escolaridade: 'Superior Completo',
        area_interesse: 'Desenvolvimento Web',
        experiencia: 'Experiência com JavaScript, React.js e Node.js',
        curriculo: 'curriculo_joao.pdf',
        cursos: 'Curso de JavaScript, Curso de React.js',
        senha: 'senha1234'
    });
}

function updateCandidato() {
    fetchApi('candidato_api.php', 'PUT', {
        id: 1,
        nome: 'João da Silva Oliveira',
        cpf: '12345678901',
        data_nascimento: '1990-05-15 00:00:00',
        email: 'joao.oliveira@teste.com',
        telefone: '1199998888',
        endereco: 'Rua Atualizada, 456, São Paulo - SP',
        escolaridade: 'Mestrado em Ciência da Computação',
        area_interesse: 'Desenvolvimento Backend',
        experiencia: 'Experiência com Node.js, MongoDB, Express.js',
        curriculo: 'curriculo_joao_atualizado.pdf',
        cursos: 'Curso de Node.js, Curso de MongoDB',
        senha: 'novaSenha1234'
    });
}

function deleteCandidato() {
    fetchApi('candidato_api.php?id=1', 'DELETE');
}
