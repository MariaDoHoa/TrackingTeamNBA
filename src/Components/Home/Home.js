import React, { useContext, useEffect, useState } from 'react'
import "./Home.scss"
import { ctx } from '../../Context/CtxData'
import { GetData } from '../../Api/ApiData'
import Car from './Car/Car'

export default function Home() {
    const [lsTeam, setLsTeam] = useState([])
    const [id, setId] = useState(0)
    const ctxData = useContext(ctx)
    useEffect(() => {
        GetData().then(dt => {
            setLsTeam(dt.data)
            //lsTeam bằng data được lấy về 
        })
    }, [])

    const TrackingTeam = () => {
        ctxData.setLsDataTracking(n => [
            //kế thừa state cũ lsTeam với mảng data có 30 phần tử trong đó
            ...n,
            //lấy ra phần tử n trong mảng, dựa vào id được truyền vào
            lsTeam[id - 1]

        ])
    }

    //value – giá trị của option, 
    //cũng là giá trị của select nếu option đó được chọn.
    return (
        <div className='Home'>
            <select value={id} onChange={(event) => setId(event.target.value)}>
                <option value={0}>Please choose your team tracking</option>
                {
                    lsTeam.map((n, i) => {
                        //console.log(n);
                        return <option value={n.id} key={i}>{n.full_name}</option>
                    })
                }
            </select>
            <button onClick={TrackingTeam}>Tracking Team</button>
            <div>
                {
                    ctxData.lsDataTracking.map((n, i) => {
                        return <Car data={n} key={i} />
                    })
                }
            </div>
        </div>
    )
}
