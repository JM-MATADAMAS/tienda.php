<?php
  require_once BASE_PATH . '/config/database.php';
  require_once BASE_PATH . '/interfaces/productoInterface.php';

  class ProductoRepository implements IProducto {
    private $conn;

    public function __construct(){
      $database = new Database();
      $this->conn = $database->getConnection();
    } 

    public function crearProducto($producto) {
      $sql = "INSERT INTO productos (nombre, descripcion, tipo, precio, imagen) VALUES (:nombre, :descripcion, :tipo, :precio, :imagen)";
      $result = $this->conn->prepare($sql);
      $result->bindParam(':nombre', $producto->nombre);
      $result->bindParam(':descripcion', $producto->descripcion);
      $result->bindParam(':tipo', $producto->tipo);
      $result->bindParam(':precio', $producto->precio);
      $result->bindParam(':imagen', $producto->imagen);

      if ($result->execute()) {
        return ['mensaje' => 'Producto Creado'];
      }
      return ['mensaje' => 'Error al crear el producto'];
    }

    public function actualizarProducto($producto) {
      $sql = "UPDATE productos SET nombre = :nombre, descripcion= :descripcion, tipo= :tipo, precio=:precio, imagen=:imagen WHERE idProducto = :idProducto";
      $result = $this->conn->prepare($sql);
      $result->bindParam(':idProducto', $producto->idProducto);
      $result->bindParam(':nombre', $producto->nombre);
      $result->bindParam(':descripcion', $producto->descripcion);
      $result->bindParam(':tipo', $producto->tipo);
      $result->bindParam(':precio', $producto->precio);
      $result->bindParam(':imagen', $producto->imagen);

      if ($result->execute()) {
        return ['mensaje' => 'Producto Actualizado'];
      }
      return ['mensaje' => 'Error al actualizar el producto'];
    }
    public function borrarProducto($idProducto) {
      $sql = "DELETE FROM productos WHERE idProducto = :idProducto";
      $result = $this->conn->prepare($sql);
      $result->bindParam(':idProducto', $idProducto);

      if ($result->execute()) {
        return ['mensaje' => 'Producto Borrado'];
      }
      return ['mensaje' => 'Error al borrar el producto'];
    }

    public function obtenerProductos() {
      $sql = "SELECT * FROM productos";
      $result = $this->conn->prepare($sql);
      $result->execute();
      return $result->fetchAll(PDO::FETCH_ASSOC);
   }

    public function obtenerProductosPorNombre($nombre) {
      $sql = "SELECT FROM productos WHERE nombre = :nombre";
      $result = $this->conn->prepare($sql);
      $result->bindParam(':nombre', $nombre);
      $result->execute();
      return $result->fetch(PDO::FETCH_ASSOC);
    }
  }
