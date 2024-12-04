import { useContext, useEffect, useState } from "react";
import CarritoContext from "../context/CarritoContext";
import fetchProductos from "@/fetchers/fetchProductos";
import { toast } from 'react-toastify';


// Esto es de ejemplo, ya que debemos linkear con la base de datos
const Productos = () => {

    const { agregarAlCarrito } = useContext(CarritoContext);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetchProductos();
                setProductos(response);
            } catch (error) {
                toast.error('Hubo un problema al cargar los productos');
            }
        }

        obtenerProductos();
    }, []);

    console.log(productos);

    return (
        <div>
            <h1>Figuras Disponibles</h1>
            <div className="lista-figuras">
                {productos.map ((producto) => (
                    <div key={producto.id} className="figura">
                        <img src={producto.image} alt={producto.nombre} />
                        <h2>{producto.name}</h2>
                        <p>${producto.price}</p>
                        <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;