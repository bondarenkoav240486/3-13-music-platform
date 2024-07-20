import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../store";

import { fetchTracks } from "../../store/actions-creators/track";

// fetchSearchTracks
import { fetchSearchTracks } from "../../store/actions-creators/searchTrack";

import PaginationComponent from "../../components/PaginationComponent";


const searchResultTracks = () => {
    const router = useRouter()
    const { tracks, error } = useTypedSelector(state => state.track)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }


    const page = parseInt(router.query.page as string) || 1; // Отримання поточної сторінки з URL
    const limit = 2; // Кількість треків на сторінці

    const onPageChange = (page: number) => {
        router.push(`/tracks?page=${page}`);
        // router.push(`/tracks?page=${page}`, undefined, { shallow: true }); // Використовуємо параметр shallow для збереження стану пагінації

    };

    return (
        <div className="ResultOfSearch">
            <MainLayout title={"Список пісень - музичний майданчик"}>
                <Grid container justifyContent='center'>
                    <Card style={{ width: 900 }}>
                        <Box p={3}>
                            <Grid container justifyContent='space-between'>
                                <h1>Результати пошуку</h1>
                            </Grid>
                        </Box>
                        <TrackList tracks={tracks.data} /> {/* Передача масиву треків */}
                        {/* <PaginationComponent
                        page={page}
                        count={Math.ceil(tracks.total / limit)} // Загальна кількість сторінок
                        onPageChange={onPageChange}
                    /> */}
                    </Card>
                </Grid>
            </MainLayout>
        </div>
    );
};

export default searchResultTracks;


// export const getServerSideProps = wrapper.getServerSideProps(async ({ query, store }) => {
//     const page = parseInt(query.page as string) || 1;
//     const limit = 2;
//     const offset = (page - 1) * limit;
//     const dispatch = store.dispatch as NextThunkDispatch;
//     await dispatch(fetchSearchTracks(limit, offset));
//     return { props: {} };
// });
