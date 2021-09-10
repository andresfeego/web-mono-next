
import styles from './AdminMarcas.module.scss'
import { useState, useEffect } from 'react';
import AgregarMarca from './AgregarMarca';



const AdminMarcas = () => {

    const [listaMarcas, setListaMarcas] = useState([])

    const getMarcas = async () => {
        const resMarcas = await fetch('http://localhost:3020/responseMono/marcas')
        const marcasJson = await resMarcas.json()
        setListaMarcas(marcasJson)
    }

    useEffect(() => {
        getMarcas()
    }, [])


    return (
        <div className="containerVentana">
            <AgregarMarca getMarcas={getMarcas} />
            <div className={styles.adminMarcas}>
                {listaMarcas.length}
            </div>
        </div>
    )
}





export default AdminMarcas