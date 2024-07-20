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
                    <p>
                        Цей проект створений з використанням технологій:
                    </p>
                    <ul>
                        <li>Node js</li>
                        <li>Nest js</li>
                        <li>Next js</li>
                        <li>Mongo DB</li>
                        <li>Amazon Web Services EC2</li>
                        <li>Nginx</li>
                    </ul>
                    
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
