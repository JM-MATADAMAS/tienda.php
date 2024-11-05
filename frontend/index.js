const apiUrl = 'http://localhost:8888/tienda.php/src/index.php'
const productForm = document.getElementById('productForm')
const alertContainer = document.getElementById('alertContainer')
const productTableBody = document.getElementById('productTableBody')
const btnSubmit = document.getElementById('submitBtn')

document.addEventListener('DOMContentLoaded', () => {
  loadProductos()
})

const borrarProducto = async (id) => {
  try {
    const send = {
      id: id
    }
    const res = await fetch(apiUrl + '/productos', {
      method: 'DELETE',
      body: JSON.stringify(send)
    })
    const borrado = await res.json()
    if (borrado && borrado.mensaje && borrado.mensaje === 'Producto Borrado'){
      showAlert('Producto Borrado', 'danger')
      loadProductos()
    }
    console.log('@@@ res => ', borrado)
  } catch (error) {
    console.error('Error: ', error)
  }
}

const loadProductos = async () => {
  try {
    const res = await fetch(apiUrl + '/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const productos = await res.json()
    productTableBody.innerHTML = ''
    productos.forEach((item) => {
      const row = document.createElement('tr')
      row.innerHTML =
      `
        <td style="display: flex; justify-content: center;">
          <img src="${item.imagen}" alt="" style = "width: 25% ;">
        </td>
        <td>${item.idProducto}</td>
        <td>${item.nombre}</td>
        <td>${item.descripcion}</td>
        <td>${item.tipo}</td>
        <td>${item.precio}</td>
        <td>
          <button class="btn btn-warning btn-sm" data_id="${item.idProducto}">Editar</button>
          <button class="btn btn-danger btn-sm" data_id="${item.idProducto}">Borrar</button>
        </td>
      `
      productTableBody.appendChild(row)
    })
  } catch (error) {
    console.error('Error:', error);
  }
}

productTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger')) {
    borrarProducto(e.target.getAttribute('data_id'))
  }
  if (e.target.classList.contains('btn-warning')) {
    getProducto(e.target.getAttribute('data_id'))
  }
})

const getProducto = async (id) => {
  try {
    const send = {
      id: id
    }
    const res = await fetch(apiUrl + '/productos/detalle', {
      method: 'POST',
      body: JSON.stringify(send)
    })
    const producto = await res.json()
    if (producto) {
      document.getElementById('idProducto').value = producto.idProducto
      document.getElementById('nombre').value = producto.nombre
      document.getElementById('descripcion').value = producto.descripcion
      document.getElementById('tipo').value = producto.tipo
      document.getElementById('precio').value = producto.precio
      document.getElementById('imagen').value = producto.imagen
    }
    console.log('@@@ res => ', producto)
  } catch (error) {
    console.error('Error: ', error)
  }
}

const crearProducto = async () => {
  const idProducto = document.getElementById('idProducto').value
  let producto = {}
  if (idProducto) {
    producto = {
      idProducto: document.getElementById('idProducto').value,
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value,
      tipo: document.getElementById('tipo').value,
      precio: document.getElementById('precio').value,
      imagen: document.getElementById('imagen').value
    }
  } else {
    producto = {
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value,
      tipo: document.getElementById('tipo').value,
      precio: document.getElementById('precio').value,
      imagen: document.getElementById('imagen').value
    }
  } 
  const url = idProducto ? `${apiUrl}/productos` : `${apiUrl}/productos`
  const method = idProducto ? 'PUT' : 'POST'
  

  console.log('@@@ ruta y metodo => ', url, method, producto)
  const resultado = await fetch (url, {
    method: method,
    body: JSON.stringify(producto)
  })

  const response = await resultado.json()
  if (response.mensaje === 'Producto Creado') {
    showAlert('Producto Agregado', 'success')
    loadProductos()
    productForm.reset()
  } else if (response.mensaje === 'Producto Actualizado') {
    showAlert('Producto Actualizado', 'warning')
    loadProductos()
    productForm.reset()
  } else {
    showAlert('Error al agregar el producto', 'danger')
  }
  document.getElementById('idProducto').value = ''

  console.log('@@@ response => ', response)
}

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  crearProducto()
})

btnSubmit.addEventListener('submit', (event) => {
  event.preventDefault()
  crearProducto()
})

const showAlert = (mensaje, tipo) => {
  alertContainer.innerHTML = 
  `
    <div class="alert alert-${tipo} alert-dismissable fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
      </button>
    </div>
  `
  setTimeout(() => {
    alertContainer.innerHTML = ''
  }, 3000)
}

