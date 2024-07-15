// import React, {FC} from 'react';
// import {AppProps} from 'next/app';
// import {wrapper} from "../store";

// const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
//     <Component {...pageProps} />
// );

// export default wrapper.withRedux(WrappedApp);

// pages/_app.js
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import Player from '../components/Player';
import Search from '../components/Search';

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Player />
  </>
);

export default wrapper.withRedux(WrappedApp);

