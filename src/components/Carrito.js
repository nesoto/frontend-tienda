import { useContext } from 'react';
import CarritoContext from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  // Calcular el total
  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className='carrito'>
          <ul>
            {carrito.map((producto) => (
              <li key={producto.id}>
                {producto.name} - ${producto.price.toFixed(2)} x {producto.cantidad}
                <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar uno</button>
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Carrito;
