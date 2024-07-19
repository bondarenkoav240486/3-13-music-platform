import React, { useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";

// import { Button, Grid, TextField,  } from "@material-ui/core";
import { Button, Grid, TextField, CircularProgress, Snackbar } from "@material-ui/core";

import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";

// import MuiAlert from '@material-ui/lab/Alert';
import MuiAlert from '@mui/material/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const [success, setSuccess] = useState(false);


    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSuccess(false);
    };


    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)

            // axios.post(process.env.NEXT_PUBLIC_API_URL + 'tracks', formData)
            //     .then(resp => router.push('/tracks'))
            //     .catch(e => console.log(e))

            setLoading(true);

            axios.post(process.env.NEXT_PUBLIC_API_URL + 'tracks', formData)
                .then(resp => {
                    setLoading(false);
                    // router.push('/tracks');

                    setSuccess(true);
                    setTimeout(() => {
                        router.push('/tracks');
                    }, 2000);
                })
                .catch(e => {
                    setLoading(false);
                    setError('Не вдалося завантажити пісню. Спробуйте знову.');
                    setOpen(true);
                });
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (

        <MainLayout>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 9999
                }}>
                    <CircularProgress />
                </div>
            )}
            
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} style={{ padding: 20 }}>
                        <TextField
                            {...name}
                            style={{ marginTop: 10 }}
                            label={"Назва пісні"}
                        />
                        <TextField
                            {...artist}
                            style={{ marginTop: 10 }}
                            label={"Ім'я виконавця"}
                        />
                        <TextField
                            {...text}
                            style={{ marginTop: 10 }}
                            label={"Слова до пісні"}
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Завантажити зображення</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept="audio/*">
                        <Button>Завантажити аудіо</Button>
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>
                    {/* Далі */}
                    {loading ? <CircularProgress size={24} /> : 'Далі'}
                </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Пісню успішно додано!
                </Alert>
            </Snackbar>
        </MainLayout>
    );
};

export default Create;
