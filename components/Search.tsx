import React, { useState, useContext } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from "next/router";
import { fetchSearchTracks } from "../store/actions-creators/searchTrack";
import { NextThunkDispatch, wrapper } from "../store";
import { useDispatch, useSelector } from 'react-redux';


export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    console.log(searchTerm)
    const router = useRouter()
    const dispatch = useDispatch();

    const handleSearch = async () => {
        // try {
        //     const response = await axios.get(`http://localhost:5000/tracks/search?query=${searchTerm}`)
        //     console.log(response)
        //     setProducts(response.data);

        // } catch (e) {
        //     console.log(e)
        // }
        await dispatch(await fetchSearchTracks(searchTerm))
        router.push('/tracks/searchResultTracks')
    };

    return (
        <div className='Search Row DrawerTop'>
            <div>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchTerm}
                    onChange={
                        (e) => {
                            setSearchTerm(e.target.value)
                        }
                    }
                    style={{ marginRight: '8px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
                <List>
                    {products.map((product) => (
                        <ListItem key={product.id}>
                            <ListItemText primary={product.name} secondary={`Price: $${product.price}`} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div >
    )
}


