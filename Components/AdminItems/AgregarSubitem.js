import { useState } from 'react';
import styles from './AgregarSubitem.module.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@material-ui/core';
import React from 'react'
import { nuevoMensaje, tiposAlertas } from '../Inicialized/Toast'
const superagent = require('superagent');




const AgregarSubitem = (props) => {


    const [open, setOpen] = useState(false)
    const [valor, setValor] = useState("")
    const [puntaje, setPuntaje] = useState("")


    function onChangeValor(e) {
        setValor(e.target.value)
    };


    function onChangePuntaje(e) {
        setPuntaje(e.target.value)
    };

    function handleClickOpen() {
        setOpen(true)
    };

    function handleClickClose() {
        setOpen(false)
        setValor("")
        setPuntaje("")
    };

    function validarInfo() {
        return new Promise((resolve, reject) => {
            if (valor == "") {
                reject("No has ingresado un valor")
            } else {
                if (puntaje == "") {
                    reject("No has ingresado un puntaje para el item")
                } else {
                    var expr = /^[0-9]+([.][0-9]+)?$/;

                    if (!expr.test(puntaje)) {
                        reject("El puntaje debe contener solos numeros en formato 25,25")
                    } else {
                        resolve()
                    }

                }
            }
        })
    }

    function guardar(valor, puntaje, idItem) {

        return new Promise((resolve, reject) => {

            superagent
                .post('http://localhost:3020/responseMono/crearSubitem')
                .send({ valor: valor, puntaje: puntaje, idItem: idItem }) // sends a JSON post body
                .set('X-API-Key', 'foobar')
                .set('accept', 'json')
                .end((err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                });



        })
    }


    async function onSubmit() {
        nuevoMensaje(tiposAlertas.cargando, "Creando subitem")
        validarInfo().then(() => {
            guardar(valor, puntaje, props.idItem).then(() => {
                props.getsubItems()
                nuevoMensaje(tiposAlertas.cargadoSuccess, "Registro exitoso")
                handleClickClose()

            }).catch((error) => {
                nuevoMensaje(tiposAlertas.cargadoError, error, 3000)
            })

        }).catch((error) => {
            nuevoMensaje(tiposAlertas.cargadoError, error, 3000)
        })
    }


    return (
        <React.Fragment>
            <div className={styles.agregarSubitem} onClick={() => handleClickOpen()}>Agregar subitem</div>

            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={open}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"><div className="tituloAgregarActividad">Nuevo subitem</div></DialogTitle>
                <DialogContent>
                    <div className="formularioUniStep">
                        <form noValidate>
                            <Input className="inputform" type="text" placeholder="Valor " value={valor} name="setNombre" onChange={onChangeValor} />
                            <Input className="inputform" type="text" placeholder="Puntaje" value={puntaje} name="setDescripcion" onChange={onChangePuntaje} />
                        </form>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => onSubmit()}>
                        Guardar
                    </Button>

                    <Button color="primary" onClick={handleClickClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AgregarSubitem