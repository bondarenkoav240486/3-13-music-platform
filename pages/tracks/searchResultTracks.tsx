import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import {ITrack} from "../../types/track";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions-creators/track";

const searchResultTracks = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Результати пошуку</h1>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks.data}/> {/* Передача масиву треків */}
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default searchResultTracks;

