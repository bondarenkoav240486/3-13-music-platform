import React, { useState, useContext } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
// import { TextField, Button } from '@mui/material';

import axios from 'axios';
import { useRouter } from "next/router";
import { fetchSearchTracks } from "../store/actions-creators/searchTrack";
import { NextThunkDispatch, wrapper } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment } from '@mui/material';

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
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
                    // label="Search Products"
                    variant="outlined"
                    value={searchTerm}
                    onChange={
                        (e) => {
                            setSearchTerm(e.target.value)
                        }
                    }
                    style={{ marginRight: '8px', }}

                    InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <IconButton edge="end" onClick={handleSearch}>
                    //                 <SearchIcon// style={{ color: 'red' }} /> 
                    //             </IconButton>
                    //         </InputAdornment>
                    //     ),
                    }}

                // InputLabelProps={{
                // shrink: true,
                // style: { color: 'red' } // Color of the label when shrunk
                // }}
                // style={{ borderRadius: 4, borderColor: 'red' }} // Border color of the input
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    {/* Search */}
                    <SearchIcon   />

                </Button>

                {/* <InputAdornment position="end">
                    <IconButton edge="end">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment> */}
                {/* <List>
                    {products.map((product) => (
                        <ListItem key={product.id}>
                            <ListItemText primary={product.name} secondary={`Price: $${product.price}`} />
                        </ListItem>
                    ))}
                </List> */}
            </div>
        </div >
    )
}


