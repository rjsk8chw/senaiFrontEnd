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

// CRUD para a entidade 'Candidatura'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM Candidatura");
    respond(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO Candidatura (soube_vaga, experiencia, data_candidatura, vaga_id, candidato_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['soube_vaga'], $data['experiencia'], $data['data_candidatura'],
        $data['vaga_id'], $data['candidato_id']
    ]);
    respond(201, ["message" => "Candidatura cadastrada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("UPDATE Candidatura SET soube_vaga=?, experiencia=?, data_candidatura=?, vaga_id=?, candidato_id=? WHERE id=?");
    $stmt->execute([
        $data['soube_vaga'], $data['experiencia'], $data['data_candidatura'],
        $data['vaga_id'], $data['candidato_id'], $data['id']
    ]);
    respond(200, ["message" => "Candidatura atualizada com sucesso."]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("DELETE FROM Candidatura WHERE id = ?");
    $stmt->execute([$data['id']]);
    respond(200, ["message" => "Candidatura removida com sucesso."]);
}
?>