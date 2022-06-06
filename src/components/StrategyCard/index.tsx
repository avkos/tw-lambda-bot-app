import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as order from '../../utils/order';
import './StrategyCard.css';
import {formatNumberToUsd} from "../../utils/helpers";
import {STRATEGY_STATUS} from "../../constants";
import Grid from "@mui/material/Grid";
import {Chip} from "@mui/material";

export default function StrategyCard({item, prices}: { item: TStrategy, prices: TPrices }) {
    const pnl = item.status === STRATEGY_STATUS.STARTED ? order.getOrderQuantity(item.data?.buyOrder) *
        (prices[item.symbol] - order.getOrderPrice(item.data?.buyOrder)) : 0
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} className='StrategyCardGrid'>
            <Card variant="outlined" className='StrategyCard'>
                <React.Fragment>
                    <CardContent>
                        <div className="DateRight">
                            {new Date(item.createdAt).toLocaleString()}
                        </div>
                        <div className="DateRight">
                            #{item.id}
                        </div>
                        <div className="SummaryItem">
                            <Typography variant='h5'>
                                <Chip label={item.status} className={`Status${item.status}`}/> <Chip
                                label={item.symbol}/>
                            </Typography>
                        </div>
                        <div className="SummaryItem">
                            <Typography variant='h5'>
                                Buy <span className='BuyColor'>{Number(order.getOrderQuantity(
                                item.data?.buyOrder)).toFixed(3)}{order.getCurrency(item.symbol)}</span> <span>at </span>
                                <span className='BuyColor'>{formatNumberToUsd(
                                order.getOrderPrice(item.data?.buyOrder))}</span>. Sum: <span
                                className='BuyColor'>{formatNumberToUsd(
                                order.getOrderQuantityUSD(item.data?.buyOrder))}</span>
                            </Typography>
                        </div>
                        {item.status === STRATEGY_STATUS.STARTED ? (
                            <div className="SummaryItem">
                                <Typography variant='h5'>
                                    Current Price: <span className='BuyColor'>{formatNumberToUsd(
                                    prices[item.symbol])}</span>
                                </Typography>
                            </div>) : (item.status === STRATEGY_STATUS.HOLD ? (
                            <div className="SummaryItem">
                                <Typography variant='h5'>
                                    Expect price: <span className='BuyColor'>{formatNumberToUsd(
                                    item.data?.unHoldPrice)}</span>
                                </Typography>
                            </div>
                        ) : (
                            <div className="SummaryItem">
                                <Typography variant='h5'>
                                    Sell: <span className='BuyColor'>{formatNumberToUsd(
                                    order.getOrderPrice(item.data?.sellOrder))}</span>
                                </Typography>
                            </div>
                        ))}
                        {item.status === STRATEGY_STATUS.STARTED ? (
                            <div className="SummaryItem">
                                <Typography variant='h5'>
                                    PNL: <span
                                    className={pnl > 0 ? 'BuyColor' : 'SellColor'}>{formatNumberToUsd(pnl)}</span>
                                </Typography>
                            </div>
                        ) : (
                            <div className="SummaryItem">
                                <Typography variant='h5'>
                                    Profit: <span className='BuyColor'>{formatNumberToUsd(item.profit)}</span>
                                </Typography>
                            </div>
                        )}
                    </CardContent>
                </React.Fragment>
            </Card>
        </Grid>
    );
}
