
import AgregarSubitem from "./AgregarSubitem"
import EditarSubitems from "./EditarSubitems"
import styles from "./Subitem.module.scss"

const Subitems = ({ subitems, getsubItems, idItem }) => {

    var puntTotal = 0

    function renderSubitem(subitem) {

        puntTotal = puntTotal + subitem.puntaje

        return (
            <div className={styles.subitem} key={subitem.id}>
                <span className={styles.valor} >{subitem.valor}</span>
                <span className={styles.puntaje} >{subitem.puntaje}</span>
                <EditarSubitems getsubItems={getsubItems} subItem={subitem} />
            </div>
        )
    }

    function renderListaSubitems(lista) {
        return (
            lista.map((subitem) => renderSubitem(subitem))
        )
    }


    return (
        <div className={styles.subitems}>
            <AgregarSubitem getsubItems={getsubItems} idItem={idItem} />

            {subitems.length > 0 ?
                renderListaSubitems(subitems)
                :
                <span>Sin subitems</span>
            }

            <div className={styles.puntajeTotal}>
                <strong>Puntaje total: </strong><span>{puntTotal}</span>
            </div>
        </div>
    )

}

export default Subitems
