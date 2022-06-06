import React, {useState, useEffect} from 'react';
import './Statistic.css';
import StrategyCard from '../StrategyCard';
import Grid from "@mui/material/Grid";
import axios from "axios";
import {formatNumberToUsd, getHoldData, getTotalProfit} from "../../utils/helpers";
import {Chip} from "@mui/material";
import * as order from "../../utils/order";
import binance from "../../utils/binance";
import Loading from "../Loading";
import {useAuth} from "../../contexts/AuthContext";

function Statistic() {
    const {accessToken} = useAuth()
    const [stat, setStat] = useState<TStat>()
    const [prices, setPrices] = useState<TPrices>({})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const token = accessToken?.jwtToken

        if (token) {
            const prs = []
            prs.push(axios.post(process.env.REACT_APP_API as string,
                {action: 'stat'}, {
                    headers: {
                        'Authorization': token,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                }))
            prs.push(binance.prices())
            Promise.all(prs)
                .then(([res, prices]) => {
                    setStat(res.data as TStat)
                    setPrices(prices as TPrices)
                }).finally(() => setLoading(false))
        }

    }, [setStat, setLoading, accessToken])


    if (loading) {
        return (
            <div className='h100'>
                <Loading/>
            </div>
        )
    }
    return (
        <div className="Statistic">
            <h2 className='TotalText'>Total: <span className='BuyColor'>{formatNumberToUsd(getTotalProfit(stat))}</span>
            </h2>
            {stat && stat.types && stat.types.length > 0 && stat.types.map((type) => {
                const hold = getHoldData(stat, type)
                return ((
                    <div key={type}>
                        <h3 className='TotalText'>Strategy "spot" total: <span
                            className='BuyColor'>{formatNumberToUsd(getTotalProfit(stat, type))}</span></h3>
                        <h3 className='TotalText'><Chip label={`HOLD (${hold.cnt})`} className='StatusHOLD'/> <span
                            className='BuyColor'>{formatNumberToUsd(hold.qtyUSDT)}</span> ({Number(hold.qty).toFixed(2)}{order.getCurrency(hold.symbol)})
                            Wait for price <span className='BuyColor'>{formatNumberToUsd(hold.avgPrice)}</span></h3>
                        <Grid container spacing={2}>
                            {stat.items.filter(s => s.type === type).map((s) => (
                                <StrategyCard key={s.id} item={s} prices={prices}/>
                            ))}
                        </Grid>
                    </div>
                ))
            })}
        </div>
    );
}

export default Statistic;
