import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, } from '@material-ui/core';
import React from 'react'
import { nuevoMensaje, tiposAlertas } from '../Inicialized/Toast'
const superagent = require('superagent');




const AgregarItem = (props) => {


    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")


    function onChangeNombre(e) {
        setNombre(e.target.value)
    };


    function onChangeDescripcion(e) {
        setDescripcion(e.target.value)
    };

    function handleClickOpen() {
        setOpen(true)
    };

    function handleClickClose() {
        setOpen(false)
        setNombre("")
        setDescripcion("")
    };

    function validarInfo() {
        return new Promise((resolve, reject) => {
            if (nombre == "") {
                reject("No has ingresado un nombre")
            } else {
                if (descripcion == "") {
                    reject("No has ingresado una descripcion para el item")
                } else {
                    resolve()
                }
            }
        })
    }

    function guardar(nombre, descripcion) {

        return new Promise(async (resolve, reject) => {

            superagent
                .post('http://localhost:3020/responseMono/crearItem')
                .send({ nombre: nombre, descripcion: descripcion }) // sends a JSON post body
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
        nuevoMensaje(tiposAlertas.cargando, "Creando Alumno")
        validarInfo().then(() => {
            guardar(nombre, descripcion).then(() => {
                nuevoMensaje(tiposAlertas.cargadoSuccess, "Registro exitoso")
                handleClickClose()
                props.getItems()

            }).catch((error) => {
                nuevoMensaje(tiposAlertas.cargadoError, error, 3000)
            })

        }).catch((error) => {
            nuevoMensaje(tiposAlertas.cargadoError, error, 3000)
        })
    }


    return (
        <React.Fragment>

            <div className="agregarAdmin" onClick={() => handleClickOpen()}>
                <span className="agregar">+</span>
                <span className="texto">Agregar item</span>
            </div>



            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={open}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"><div className="tituloAgregarActividad">Nuevo Alumno</div></DialogTitle>
                <DialogContent>
                    <div className="formularioUniStep">
                        <form noValidate>
                            <Input className="inputform" type="text" placeholder="Nombre item" value={nombre} name="setNombre" onChange={onChangeNombre} />
                            <Input className="inputform" type="text" placeholder="Descripción" value={descripcion} name="setDescripcion" onChange={onChangeDescripcion} />
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

export default AgregarItem