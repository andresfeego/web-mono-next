
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import styles from './AdminItems.module.scss'
import { useState, useEffect } from 'react';
import AgregarItem from './AgregarItem';
import Subitems from './Subitems'

const AdminItems = () => {
    const [idItem, setIdItem] = useState("0")
    const [listaItems, setListaItems] = useState([])
    const [subitems, setSubitems] = useState([])

    function onChangeIdItem(e) {
        setIdItem(e.target.value)
    }



    const getItems = async () => {
        const resItems = await fetch('http://localhost:3020/responseMono/items')
        const itemsJson = await resItems.json()
        setListaItems(itemsJson)
    }

    const getsubItems = async () => {
        const resSubitems = await fetch('http://localhost:3020/responseMono/subitems/' + idItem)
        const subitemsJson = await resSubitems.json()
        setSubitems(subitemsJson)
    }

    useEffect(() => {
        getsubItems()
    }, [idItem])

    useEffect(() => {
        getItems()
    }, [])


    return (
        <div className="containerVentana">
            <AgregarItem getItems={getItems} />
            <div className={styles.adminItems}>
                <form noValidate className={styles.Form}>

                    <FormControl className={styles.inputForm} >
                        <InputLabel htmlFor="max-width">Item</InputLabel>
                        <Select className="inputform" autoFocus value={0} onChange={onChangeIdItem} value={idItem} inputProps={{ name: 'idItem', id: 'idItem' }} >
                            <MenuItem key={0} value={0}>Seleccioneeeee el item</MenuItem>
                            {listaItems.length > 0 ? listaItems.map((item) => <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>) : null}
                        </Select>
                    </FormControl>

                </form>

                <div className={styles.adminSubItems}>
                    {idItem > 0 ?
                        <Subitems subitems={subitems} getsubItems={getsubItems} idItem={idItem} />
                        :
                        <span>Selecciona un item</span>
                    }

                </div>

            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    console.log("serversidepropsindex")
    var props = { props: {} }

    const resSlides = await fetch('http://localhost:3020/responseMono/items')
    const slidesJson = await resSlides.json()
    props.props = { items: slidesJson }



    return props
}

export default AdminItems