import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";
// import Player from "../../components/Player";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks } from "../../store/actions-creators/track";
import PaginationComponent from "../../components/PaginationComponent";
import axios from "axios";

const Index = () => {
    const router = useRouter()
    const { tracks, error } = useTypedSelector(state => state.track)


   

    const page = parseInt(router.query.page as string) || 1; // Отримання поточної сторінки з URL
    const limit = 2; // Кількість треків на сторінці
    // const offset = (page - 1) * limit;

    // const stateTrack = useTypedSelector(state => state.track)
    // console.log(stateTrack)
    // axios.get(`http://localhost:5000/tracks?count=${2}&offset=${offset}`)
    // .then(
    //     (res) => {
    //         console.log(res)
    //     }
    // )

    const onPageChange = (page: number) => {
        router.push(`/tracks?page=${page}`);
        // router.push(`/tracks?page=${page}`, undefined, { shallow: true }); // Використовуємо параметр shallow для збереження стану пагінації

    };


    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid container justifyContent='center'>
                <Card style={{ width: 900 }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Загрузить
                            </Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks.data} />
                </Card>
                {/* <PaginationComponent
                    count={tracks.total/limit} // Передача загальної кількості сторінок
                    onPageChange={onPageChange} // Передача функції зміни сторінки
                /> */}
                <PaginationComponent
                        page={page}
                        count={Math.ceil(tracks.total / limit)} // Загальна кількість сторінок
                        onPageChange={onPageChange}
                    />

            </Grid>
        </MainLayout>
    );
};

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks())
// })

// Додавання параметрів count і offset для fetchTracks
export const getServerSideProps = wrapper.getServerSideProps(async ({ query, store }) => {
    const page = parseInt(query.page as string) || 1;
    const limit = 2;
    const offset = (page - 1) * limit;
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks(limit, offset));
    return { props: {} };
});
