import Link from 'next/link';
import { useEffect, useState } from 'react';
import fetchProductos from '@/fetchers/fetchProductos';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetchProductos();
        // Sort products by stock and get the top 3
        const topProductos = response
          .sort((a, b) => b.stock - a.stock)
          .slice(0, 3);
        setProductosDestacados(topProductos);
      } catch (error) {
        toast.error('Hubo un problema al cargar los productos');
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="container">
      <h1 className="font-bold font-serif text-xl">Bienvenido a OtakuBox</h1>
      <p style={{ textAlign: 'center' }}>Descubre tus personajes favoritos y colecciona las mejores figuras de anime.</p>
      <div className="lista-figuras">
        {productosDestacados.map((producto) => (
          <div key={producto.id} className="card">
            <h2>{producto.name}</h2>
            <p>Precio: ${producto.price.toFixed(2)}</p>
            <p>{producto.description}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/productos">
          Ver más productos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
