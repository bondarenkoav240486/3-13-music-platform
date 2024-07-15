import React from 'react';
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";

import axios from "axios";

import { useTypedSelector } from "../hooks/useTypedSelector";



interface TrackItemProps {
    track: ITrack;
    // active?: boolean;
}

// const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const { active, pause } = useTypedSelector(state => state.player);



    // const play = async (e) => {
    //     e.stopPropagation()
    //     setActiveTrack(track)
    //     playTrack()
    //     try {
    //         const response = await axios.post('http://localhost:5000/tracks/listen/' + track._id)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    const play = async (e) => {
        e.stopPropagation();
        if (track._id === active?._id) {

            if (pause) {
                playTrack();
            } else {
                pauseTrack();
            }
        } else {
            setActiveTrack(track);
            // playTrack();
            console.log(1)

            try {
                await axios.post('http://localhost:5000/tracks/listen/' + track._id);
            } catch (e) {
                console.log(e);
            }
            playTrack();
            console.log(12)
            console.log(pause)


        }
    };


    const deleteTrack = async (e) => {
        e.stopPropagation()
        try {
            const response = await axios.delete('http://localhost:5000/tracks/' + track._id)
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            {/* <IconButton onClick={play}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton> */}

            <IconButton onClick={play}>
                {active?._id === track._id && !pause
                // {active?._id === track._id 
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>

            


            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton
                // onClick={e => e.stopPropagation()}
                onClick={deleteTrack}
                style={{ marginLeft: 'auto' }}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
