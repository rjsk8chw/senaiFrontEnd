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

// CRUD para a entidade 'Vaga'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM Vaga");
    respond(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO Vaga (titulo, descricao, requisitos, salario, localizacao, tipo_contratacao, beneficios, data_limite, qtd_vaga, jornada_trabalho, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['titulo'], $data['descricao'], $data['requisitos'], $data['salario'],
        $data['localizacao'], $data['tipo_contratacao'], $data['beneficios'], $data['data_limite'],
        $data['qtd_vaga'], $data['jornada_trabalho'], $data['empresa_id']
    ]);
    respond(201, ["message" => "Vaga cadastrada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("UPDATE Vaga SET titulo=?, descricao=?, requisitos=?, salario=?, localizacao=?, tipo_contratacao=?, beneficios=?, data_limite=?, qtd_vaga=?, jornada_trabalho=?, empresa_id=? WHERE id=?");
    $stmt->execute([
        $data['titulo'], $data['descricao'], $data['requisitos'], $data['salario'],
        $data['localizacao'], $data['tipo_contratacao'], $data['beneficios'], $data['data_limite'],
        $data['qtd_vaga'], $data['jornada_trabalho'], $data['empresa_id'], $data['id']
    ]);
    respond(200, ["message" => "Vaga atualizada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("DELETE FROM Vaga WHERE id = ?");
    $stmt->execute([$data['id']]);
    respond(200, ["message" => "Vaga removida com sucesso."]);
}
?>