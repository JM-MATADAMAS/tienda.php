<?php
interface IProducto {
  public function crearProducto($producto);
  public function actualizarProducto($producto);
  public function borrarProducto($idProducto);
  public function obtenerProductos();
  public function obtenerProductosPorNombre($nombre);
}
