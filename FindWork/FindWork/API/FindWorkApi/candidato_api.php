<?php 
// db_connect.php - Conexão com o banco de dados
header('Access-Control-Allow-Origin: *'); // Permite todas as origens
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Cabeçalhos permitidos

header('Content-Type: application/json');
$host = 'localhost';
$db = 'findwork';
$user = 'root';
$pass = 'senai2024';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erro na conexão: " . $e->getMessage()]);
    exit;
}

// Função para responder com JSON
function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// CRUD para a entidade 'Candidato'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM Candidato");
    respond(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO Candidato (nome, cpf, data_nascimento, email, telefone, endereco, escolaridade, area_interesse, experiencia, curriculo, cursos, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['nome'], $data['cpf'], $data['data_nascimento'], $data['email'],
        $data['telefone'], $data['endereco'], $data['escolaridade'], $data['area_interesse'],
        $data['experiencia'], $data['curriculo'], $data['cursos'], password_hash($data['senha'], PASSWORD_DEFAULT)
    ]);
    respond(201, ["message" => "Candidato cadastrado com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("UPDATE Candidato SET nome=?, cpf=?, data_nascimento=?, email=?, telefone=?, endereco=?, escolaridade=?, area_interesse=?, experiencia=?, curriculo=?, cursos=?, senha=? WHERE id=?");
    $stmt->execute([
        $data['nome'], $data['cpf'], $data['data_nascimento'], $data['email'],
        $data['telefone'], $data['endereco'], $data['escolaridade'], $data['area_interesse'],
        $data['experiencia'], $data['curriculo'], $data['cursos'], password_hash($data['senha'], PASSWORD_DEFAULT),
        $data['id']
    ]);
    respond(200, ["message" => "Candidato atualizado com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("DELETE FROM Candidato WHERE id = ?");
    $stmt->execute([$data['id']]);
    respond(200, ["message" => "Candidato removido com sucesso."]);
}
?>