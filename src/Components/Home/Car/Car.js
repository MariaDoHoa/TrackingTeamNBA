import React, { useEffect, useState } from 'react'
import "./Car.scss"
import { GetTeamTracking } from '../../../Api/ApiData';
import { useNavigate } from 'react-router-dom';

export default function Car(props) {
    const [result, setResult] = useState([])
    const [score, setScore] = useState(0)
    const [conceded, setConceded] = useState(0)
    const nav = useNavigate()

    useEffect(() => {
        GetTeamTracking(props.data.id).then(dt => {
            let score = 0
            let conceded = 0
            dt.data.forEach(n => {
                if (n.home_team == props.data.id) {//homeTeam
                    score += n.home_team_score;
                    conceded += n.visitor_team_score
                }
                else {
                    conceded += n.home_team_score;
                    score += n.visitor_team_score
                }
            });
            setResult(dt.data)
            setScore(Math.round(score / dt.data.length))
            setConceded(Math.round(conceded / dt.data.length))
        })
    }, [])
    return (
        <div className='Car'>
            <h2>{props.data.full_name} [{props.data.abbreviation}]</h2>
            <p>{props.data.conference} conference</p>
            <hr />
            <div className='result'>
                <div>
                    <div className='content'>
                        <h4>Results of past 12 days:</h4>
                        {
                            result.map((n, i) => {
                                let final = ""
                                if (n.home_team.id == props.data.id) {
                                    final = (n.home_team_score > n.visitor_team_score ? "W" : "L")
                                }
                                else {
                                    final = (n.home_team_score < n.visitor_team_score ? "W" : "L")
                                }
                                return <span key={i} style={{ background: (final == "W" ? "Green" : "Red") }}> {final} </span>
                            })
                        }
                        <p style={{ paddingTop: "10px" }}>Avg pts scored: {score}</p>
                        <p>Avg pts conceded{conceded}</p>
                    </div>
                    <div className='img'>
                        <img src={`https://interstate21.com/nba-logos/${props.data.abbreviation}.png`} />
                    </div>
                </div>
            </div>
            <button onClick={() => nav(`/results/${props.data.abbreviation}`)}>See game result</button>
        </div >
    )
}
