<?php
  interface IEmpleado {
    public function crearEmpleado ($empleado);
    public function actualizarEmpleado ($empleado);
    public function borrarEmpleado ($idEmpleado);
    public function obtenerEmpleados ();
    public function obtenerEmpleadosPorRol ($rol);
  }