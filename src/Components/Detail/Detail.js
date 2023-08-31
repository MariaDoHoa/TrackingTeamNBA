import React, { useEffect, useState } from 'react'
import "./Detail.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { GetData, GetTeamTracking } from '../../Api/ApiData'

export default function Detail() {
    const param = useParams()
    const [team, setTeam] = useState(null)
    const [result, setResult] = useState(null)
    const nav = useNavigate()

    useEffect(() => {
        //lấy thông tin thi đấu của đội bóng được tracking
        GetData().then(dt => {
            //console.log(dt);
            let team = dt.data.filter(n => n.abbreviation == param.teamCode)[0]
            //console.log(team);
            setTeam(team)

            GetTeamTracking(team.id).then(dt => {
                setResult(dt.data)
            })
        })
    }, [])
    return (
        team ? <div className='Detail'>
            <h2>{team.full_name} [{team.abbreviation}]</h2>
            <p>{team.conference} conference</p>
            <hr />
            <h4>Scores of past 12 days:</h4>
            {
                result?.map((n, i) => {
                    return (
                        <div key={i} style={{ display: "flex" }}>
                            <p>{n.home_team.abbreviation}<span> {n.home_team_score}</span></p>-
                            <p><span>{n.visitor_team_score}</span> {n.visitor_team.abbreviation}</p>
                        </div>
                    )
                })
            }

            <button onClick={() => nav(`/`)}>Back to all team stats</button>
        </div>
            : <h1>Loading...</h1>
    )
}
