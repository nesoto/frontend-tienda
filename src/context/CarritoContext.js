import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    // Obtener el carrito guardado en localStorage
    if (typeof window !== "undefined") {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    return [];
  });

  useEffect(() => {
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Buscar si el producto ya existe en el carrito
      const productoExistente = prevCarrito.find(item => item.id === producto.id);

      if (productoExistente) {
        toast.info(`Cantidad incrementada para ${producto.name}`);
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        toast.success(`${producto.name} añadido al carrito`);
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito (uno a uno)
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(item => item.id === id);

      if (productoExistente.cantidad > 1) {
        toast.info(`Se resto un ${productoExistente.name} del carrito`);
        return prevCarrito.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        toast.warn(`${productoExistente.name} eliminado del carrito`);
        return prevCarrito.filter(item => item.id !== id);
      }
    });
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;
