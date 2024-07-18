import React from 'react';
import {Button} from "@material-ui/core";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
        <div className='Main_Page'>
            <MainLayout>
                <div className="center">
                    <h1>Ласкаво просимо!</h1>
                    <h3>Тут зібрані кращі пісні!</h3>
                </div>
            </MainLayout>

            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                `}
            </style>
        </div>
    );
};

export default Index;
