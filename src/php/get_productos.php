<?php
include 'db.php';

header('Content-Type: application/json');

$q = isset($_GET['q']) ? $conn->real_escape_string($_GET['q']) : '';
$habilitadoFiltro = isset($_GET['habilitado']) && $_GET['habilitado'] !== '' ? (int) $_GET['habilitado'] : null;

$sql = "SELECT id, nombre, descripcion, imagen, habilitado FROM productos";
$filtros = [];

if (!empty($q)) {
    $filtros[] = "(nombre LIKE '%$q%' OR descripcion LIKE '%$q%' OR imagen LIKE '%$q%')";
}

if ($habilitadoFiltro === 1) {
    $filtros[] = "habilitado = 1";
} elseif ($habilitadoFiltro === 0) {
    $filtros[] = "habilitado = 0";
}

if (!empty($filtros)) {
    $sql .= " WHERE " . implode(" AND ", $filtros);
}

$result = $conn->query($sql);
$productos = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);
?>
