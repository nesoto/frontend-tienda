import { useState, useContext } from 'react';
import CarritoContext from '../context/CarritoContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  // Estado del formulario
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  // Obtener los productos del carrito
  const { carrito } = useContext(CarritoContext);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
  
    const orderData = {
      nombre,
      direccion,
      correo,
      carrito: carrito.map(producto => ({
        name: producto.name,
        cantidad: producto.cantidad
      }))
    };
  
    try {
      const response = await fetch('http://127.0.0.1:7000/API/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const result = await response.json();
      toast.success('Compra realizada con éxito');
      console.log(result);
    } catch (error) {
      toast.error('Hubo un problema con la compra');
      console.error(error);
    }
  }
  // Calcular el total de la compra
  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      {/* Resumen del Carrito */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Resumen del Carrito</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {carrito.map((producto) => (
              <li key={producto.id} className="flex justify-between border-b py-2">
                <span>{producto.name} (x{producto.cantidad})</span>
                <span>${(producto.price * producto.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Formulario de Checkout */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nombre">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full p-2 border border-gray-300 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="direccion">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            className="w-full p-2 border border-gray-300 rounded"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="correo">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            className="w-full p-2 border border-gray-300 rounded"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-900 text-white py-2 rounded hover:bg-orange-950"
        >
          Realizar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
