import "./stylesGlobal.scss"
import React from 'react'
import { Provider } from 'react-redux'
import localStore from '../components/Inicialized/localStore'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      transition={Flip}
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover />
    <Provider store={localStore}>
      <Component {...pageProps} />
    </Provider>

  </React.Fragment>
)

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default App