
import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";
import Player from "../components/Player";
import Head from "next/head";

import {useTypedSelector} from "../hooks/useTypedSelector";


interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
           children,
           title,
            description,
            keywords
       }) => {

    return (
        <>
            <Head>
                <title>{title || 'Музичний майданчик'}</title>
                <meta name="description" content={`Музичний майданчик. Тут кожен може залишити свою пісню і стати відомим.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Музика, пісні, артисти"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            {/* <Player/> */}
        </>
    );
};

export default MainLayout;
