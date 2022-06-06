export {};

declare global {
    type TOrder = {
        avgPrice?: string | number
        price?: string | number
        stopPrice?: string | number
        status?: string
        totalQty?: string | number
        origQty?: string | number
    }
    type TFill = {
        commissionAsset?: string
        commission?: string
        price?: string | number
        qty?: string | number
    }
    type THold = {
        id?: string
        type: string
        symbol: string
        status?: string
        data?: any
        avgPrice?: number
        avgPriceProfit?: number
        orderId?: string
        qty?: number
        createdAt?: string | number
    }
    type TSetting = {
        id?: string
        type: string
        symbol: string
        status?: string
        data: { isReuseHold: boolean, riskPercent: number, minAmountUSDT: number }
        createdAt?: string | number
    }
    type TStrategy = {
        id?: string
        type: string
        symbol: string
        status?: string
        profit?: number
        data?: {
            buyOrder?: TOrder,
            sellOrder?: TOrder,
            fromStrategyId?: string,
            unHoldPrice?: number
        }
        createdAt: string | number
        holdId?: string
        unHoldPrice?: number
    }
    type THoldData = { avgPrice: number, qty: number, qtyUSDT: number, cnt: number, symbol: string }
    type TStat = {
        items: TStrategy[]
        holds: {
            [key: string]: THoldData
        }
        profits: {
            [key: string]: number
        }
        types: string[]
    }
    type TPrices = { [key: string]: number }
}

