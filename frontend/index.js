const apiUrl = 'http://localhost:8888/tienda.php/src/index.php'
const productForm = document.getElementById('productForm')
const alertContainer = document.getElementById('alertContainer')
const productTableBody = document.getElementById('productTableBody')
const btnSubmit = document.getElementById('submitBtn')

document.addEventListener('DOMContentLoaded', ()=> {
  loadProductos()
})

const loadProductos = async() => {
  try {
    const res = await fetch (apiUrl + '/productos', {
      method:'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    const productos = await res.json()
    console.log('@@@ productos => ', productos)
    productTableBody.innerHTML = ''
    productos.forEach(item => {
      const row = document.createElement('tr')
      row.innerHTML = 
      `
        <td>${item.idProducto}</td>
        <td>${item.nombre}</td>
        <td>${item.descripcion}</td>
        <td>${item.tipo}</td>
        <td>${item.precio}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarProducto(${item.idProducto})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="borrarProducto(${item.idProducto})">Borrar</button>
        </td>
      `
      productTableBody.appendChild(row)  // Mover aquí
    })    
  } catch (error) {
    console.error('Error:', error)
  }
}

const crearProducto = async() => {
  const idProducto = document.getElementById('idProducto').value
  const producto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    tipo: document.getElementById('tipo').value,
    precio: document.getElementById('precio').value,
    imagen: document.getElementById('imagen').value

  }
  const url = idProducto ? `${apiUrl}/productos/id=${idProducto}` : `${apiUrl}/productos`
  const method = idProducto ? 'PUT' : 'POST'

  const resultado = await fetch (url, {
    method: method,
    body: JSON.stringify(producto)
  })
  const response = await resultado.json()
  console.log ('@@@ response =>', response)
  if (response === '{"mensaje":"Producto Creado"}') {
    showAlert('Producto Creado', 'success')
    loadProductos()
    productForm.reset()
  } else {
    showAlert('Error al agregar el producto', 'danger')
  }
  document.getElementById('idProducto').value = ''

}

btnSubmit.addEventListener('click', async(event) => {
  event.preventDefault()
  crearProducto()
})

btnSubmit.addEventListener('submit', async(event) => {
  event.preventDefault()
  crearProducto()
})

const showAlert = (mensaje, tipo) => {
  alertContainer.innerHTML= `
  <div class ="alert alert-${tipo} alert-dismissable fade show" role="alert">
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
    </button>
  </div>`
  setTimeout(()=> {
    alertContainer.innerHTML = ''
  },3000)
}