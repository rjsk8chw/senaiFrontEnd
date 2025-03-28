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

// CRUD para a entidade 'Empresa'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM Empresa");
    respond(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO Empresa (razao_social, descricao, endereco, qtd_funcionario, telefone, email, site, rede_social, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['razao_social'], $data['descricao'], $data['endereco'], $data['qtd_funcionario'],
        $data['telefone'], $data['email'], $data['site'], $data['rede_social'],
        password_hash($data['senha'], PASSWORD_DEFAULT)
    ]);
    respond(201, ["message" => "Empresa cadastrada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("UPDATE Empresa SET razao_social=?, descricao=?, endereco=?, qtd_funcionario=?, telefone=?, email=?, site=?, rede_social=?, senha=? WHERE id=?");
    $stmt->execute([
        $data['razao_social'], $data['descricao'], $data['endereco'], $data['qtd_funcionario'],
        $data['telefone'], $data['email'], $data['site'], $data['rede_social'],
        password_hash($data['senha'], PASSWORD_DEFAULT), $data['id']
    ]);
    respond(200, ["message" => "Empresa atualizada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("DELETE FROM Empresa WHERE id = ?");
    $stmt->execute([$data['id']]);
    respond(200, ["message" => "Empresa removida com sucesso."]);
}
?>