// import React, { useEffect } from 'react';
// import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
// import { Grid, IconButton } from "@material-ui/core";
// import styles from '../styles/Player.module.scss'
// import { ITrack } from "../types/track";
// import TrackProgress from "./TrackProgress";
// import { useTypedSelector } from "../hooks/useTypedSelector";
// import { useActions } from "../hooks/useActions";

// let audio;

// const Player = () => {
//     const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
//     const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()

//     useEffect(() => {
//         if (!audio) {
//             audio = new Audio()
//         } else {
//             setAudio()
//             play()
//         }
//     }, [active])

//     const setAudio = () => {
//         if (active) {
//             audio.src = 'http://localhost:5000/' + active.audio
//             audio.volume = volume / 100
//             audio.onloadedmetadata = () => {
//                 setDuration(Math.ceil(audio.duration))
//             }
//             audio.ontimeupdate = () => {
//                 setCurrentTime(Math.ceil(audio.currentTime))
//             }
//         }
//     }

//     const play = () => {
//         if (pause) {
//             playTrack()
//             audio.play()
//         } else {
//             pauseTrack()
//             audio.pause()
//         }
//     }

//     const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
//         audio.volume = Number(e.target.value) / 100
//         setVolume(Number(e.target.value))
//     }
//     const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
//         audio.currentTime = Number(e.target.value)
//         setCurrentTime(Number(e.target.value))
//     }

//     if (!active) {
//         return null
//     }

//     return (
//         <div className={styles.player}>
//             <IconButton onClick={play}>
//                 {pause
//                     ? <PlayArrow />
//                     : <Pause />
//                 }
//             </IconButton>
//             {/* <IconButton onClick={play}>
//                 {active?._id === track._id && !pause
//                     ? <Pause />
//                     : <PlayArrow />
//                 }
//             </IconButton> */}
//             <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
//                 <div>{active?.name}</div>
//                 <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
//             </Grid>
//             <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
//             <VolumeUp style={{ marginLeft: 'auto' }} />
//             <TrackProgress left={volume} right={100} onChange={changeVolume} />
//         </div>
//     );
// };

// export default Player;



import React, { useEffect, useRef } from 'react';
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import styles from '../styles/Player.module.scss'
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const Player = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
        if (active) {
            setAudio();
            if (!pause) {
                audioRef.current.play();
            }
        }
    }, [active]);

    useEffect(() => {
        if (audioRef.current) {
            if (pause) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    }, [pause]);

    const setAudio = () => {
        if (active) {
            // audioRef.current.src = 'http://localhost:5000/' + active.audio;
            audioRef.current.src = process.env.NEXT_PUBLIC_API_URL + active.audio;
            audioRef.current.volume = volume / 100;
            audioRef.current.onloadedmetadata = () => {
                setDuration(Math.ceil(audioRef.current.duration));
            };
            audioRef.current.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audioRef.current.currentTime));
            };

            audioRef.current.onended = () => {
                pauseTrack()
            }
        }
    };

    const play = () => {
        if (pause) {
            playTrack();
        } else {
            pauseTrack();
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };

    if (!active) {
        return null;
    }

    return (
        <div
            className={styles.player}
        >
            <div className='playbutton_name_volume'>
                <IconButton onClick={play}>
                    {
                        pause
                            ?
                            // <PlayArrow />
                            <PlayCircleOutlineIcon />
                            :
                            // <Pause />
                            <PauseCircleOutlineIcon />
                    }
                </IconButton>
                {/* <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}> */}
                <Grid container direction="column" style={{ margin: '0 1.20rem' }}>
                    <div>{active?.name}</div>
                    {/* <div>active?.name</div> */}
                    <div>
                        {active?.artist}
                    </div>
                    {/* <div style={{ fontSize: 12, color: 'gray' }}>active?.artist</div> */}
                </Grid>
                {/* <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} /> */}
                {/* <VolumeUp style={{ marginLeft: 'auto' }} /> */}
                <div
                    className={'volume_progress'}
                >
                    <VolumeUp style={{ marginLeft: 'auto' }} />

                    <TrackProgress left={volume} right={100} onChange={changeVolume} />
                </div>
            </div>
            <div
                className={'time_progress'}
            >
                <TrackProgress
                    left={currentTime}
                    right={duration}
                    onChange={changeCurrentTime}
                />
            </div>
        </div>
    );
};

export default Player;

