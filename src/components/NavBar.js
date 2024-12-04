import Link from 'next/link';
import { useContext } from 'react';
import CarritoContext from '@/context/CarritoContext';
// Componente de navegación

const Navbar = () => {

    const { carrito } = useContext(CarritoContext);

    // Cantidad de productos en el carrito
    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);


    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href="/productos">
                        Productos
                    </Link>
                </li>
                <li>
                    <Link href="/carrito">
                        Carrito <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-2">{totalArticulos}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/checkout">
                        Checkout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;