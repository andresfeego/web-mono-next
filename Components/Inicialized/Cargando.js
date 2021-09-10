import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./Cargando.module.scss"


const override = css`
  display: block;
  margin: 0 auto;
  border-color: gray;
`;

const Cargando = () => {


        return (
            <div className={styles.CargandoContainer}>
                
                <BeatLoader
                    css={override}
                    size={15}
                    color={"gray"}
                    loading={true}
                />

                <span className={styles.cargando}>Cargando...</span>

          </div>
        )
}

export default Cargando