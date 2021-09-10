import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Input, TextField } from '@material-ui/core';
import React from 'react'
import { nuevoMensaje, tiposAlertas } from '../Inicialized/Toast'
const superagent = require('superagent');
import { ColorPicker, createColor } from "material-ui-color";
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const palette = [
    '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
];



const AgregarMarca = (props) => {


    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState("")
    const [resena, setResena] = useState("")
    const [imagen, setImagen] = useState(null)
    const [imagenSrc, setImagenSrc] = useState("")
    const [colorUno, setColorUno] = useState(createColor('#000000'))
    const [colorDos, setColorDos] = useState(createColor('#000000'))
    const [colorTres, setColorTres] = useState(createColor('#000000'))


    function onChangeNombre(e) {
        setNombre(e.target.value)
    };

    function onChangeResena(e) {
        setResena(e.target.value)
    };

    function onChangeColorUno(color) {
        setColorUno(color)

    };

    function onChangeColorDos(color) {
        setColorDos(color)
    };

    function onChangeColorTres(color) {
        setColorTres(color)
    };


    function handleClickOpen() {
        setOpen(true)
    };

    function handleClickClose() {
        setOpen(false)
        setNombre("")
        setResena("")
        setColorUno(createColor('#000000'))
        setColorDos(createColor('#000000'))
        setColorTres(createColor('#000000'))
        setImagen(null)
        setImagenSrc("")
    };

    function onSelectFileImage(e) {
        if (e.target.files[0]) {
            var file = e.target.files[0]

            if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
                setImagen(file)
                const reader = new FileReader();
                reader.addEventListener('load', () =>
                    setImagenSrc(reader.result)
                );
                reader.readAsDataURL(file);
            } else {
                nuevoMensaje(tiposAlertas.error, "Solo se permite cargar imagenes - .jpg .png .jpeg -")
            }
        }

    }

    function isValidColor(color) {
        var isColor = true
        try {
            isColor = (color.match(/^#[A-F0-9]{6}$/i) !== null || color.match(/^#[A-F0-9]{8}$/i) !== null || color.match(/^#[A-F0-9]{3}$/i) !== null)

            return isColor
        } catch (error) {
            return false
        }
    }

    function validarInfo() {
        return new Promise((resolve, reject) => {
            if (nombre == "") {
                reject("No has ingresado un nombre")
            } else {
                if (resena == "") {
                    reject("No has ingresado una resena para esta marca")
                } else {
                    if (!isValidColor('#' + colorUno.hex)) {
                        reject("Color 1 no valido")
                    } else {
                        if (!isValidColor('#' + colorDos.hex)) {
                            reject("Color 2 no valido")
                        } else {
                            if (!isValidColor('#' + colorTres.hex)) {
                                reject("Color 3 no valido")
                            } else {
                                if (imagen == null) {
                                    reject("Debes agregar un logo")
                                } else {
                                    resolve()
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    function guardarImagen() {
        return new Promise((resolve, reject) => {
            superagent
                .post('http://localhost:3020/responseMono/uploadLogoMarca/' + nombre)
                .attach('image', imagen)
                .set('accept', 'json')
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        reject("Error al guardar información")
                    } else {
                        const respuestaLogin = JSON.parse(res.text);
                        resolve(respuestaLogin.imagen.filename)

                    }
                });
        })
    }

    function guardar() {

        return new Promise(async (resolve, reject) => {

            guardarImagen().then((url) => {

                superagent
                    .post('http://localhost:3020/responseMono/crearMarca')
                    .send({ nombre: nombre, resena: resena, urlLogo: url, colorUno: colorUno.hex, colorDos: colorDos.hex, colorTres: colorTres.hex }) // sends a JSON post body
                    .set('X-API-Key', 'foobar')
                    .set('accept', 'json')
                    .end((err, res) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    });

            }).catch((error) => {
                reject(error)
            })



        })
    }


    async function onSubmit() {
        nuevoMensaje(tiposAlertas.cargando, "Creando marca")
        validarInfo().then(() => {
            guardar().then(() => {
                nuevoMensaje(tiposAlertas.cargadoSuccess, "Registro exitoso")
                handleClickClose()
                props.getMarcas()

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
                <span className="texto">Agregar marca</span>
            </div>



            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={open}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"><div className="tituloAgregarActividad">Nueva Marca</div></DialogTitle>
                <DialogContent>
                    <div className="formularioUniStep">
                        <form noValidate>
                            <Input className="inputform" type="text" placeholder="Nombre item" value={nombre} name="setNombre" onChange={onChangeNombre} />
                            <TextField value={resena} onChange={onChangeResena} id="standard-textarea" placeholder="Reseña" multiline />
                            <label htmlFor="upload-photo" className="inputform">
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={onSelectFileImage}
                                />

                                <Fab
                                    color="secondary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                    <WallpaperIcon /> <span>Escoger logo </span>
                                </Fab>

                            </label>
                            <img src={imagenSrc} alt="" />

                            <div className="inputform">
                                <h2>Color 1</h2>
                                <ColorPicker value={colorUno} id="newCategoryColour" onChange={onChangeColorUno} format="hex" margin="dense" size="small" hideTextfield />
                            </div>
                            <div className="inputform">
                                <h2>Color 2</h2>
                                <ColorPicker value={colorDos} id="newCategoryColour" onChange={onChangeColorDos} format="hex" margin="dense" size="small" hideTextfield />
                            </div>
                            <div className="inputform">
                                <h2>Color 3</h2>
                                <ColorPicker value={colorTres} id="newCategoryColour" onChange={onChangeColorTres} format="hex" margin="dense" size="small" hideTextfield />
                            </div>
                        </form>
                    </div>



                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onSubmit}>
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

export default AgregarMarca