import "@/styles/globals.css";
import NavBar from "../components/NavBar";
import { CarritoProvider } from "../context/CarritoContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {
  return (
    <>
      <CarritoProvider>
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer />
      </CarritoProvider>
    </>
  )
}
