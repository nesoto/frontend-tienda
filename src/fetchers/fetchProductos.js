
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchProductos = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:7000/API/all_products');

        const transformarProductos = response.data.map(producto => ({
            id: producto[0],
            name: producto[1],
            description: producto[2],
            price: producto[3],
            category: producto[4],
            stock: producto[5],
            image: producto[6]
        }));
        return transformarProductos;
    } catch (error) {
        toast.error('Hubo un problema al cargar los productos');
    }
}

export default fetchProductos;