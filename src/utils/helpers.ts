export const formatNumberToUsd = (value: string | number| undefined, digits = 2, isShowSign = false, currency = '$', isAfter = false) => {

    if (!value) {
        value = 0;
    }
    value = Number(value);
    return `${isShowSign ? (value > 0 ? '+' : value < 0 ? '-' : '') : ''}${isAfter ? '' : currency}${new Intl.NumberFormat('en-US', {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
    }).format(value || 0)}${isAfter ? currency : ''}`;
};

export const getTotalProfit = (stat?: TStat, type?: string): number => {
    if (!stat) {
        return 0
    }
    if (type) {
        return (stat && stat.profits && stat.profits[type]) || 0;
    } else {
        if (stat.types.length > 0) {
            return stat.types.reduce((acc, type) => acc + (Number(stat.profits[type]) || 0), 0);
        }
        return 0;
    }
}


export const getHoldData = (stat: TStat, type: string): THoldData => {
    return (stat && stat.holds && stat.holds[type]) ||
        {avgPrice: 0, qty: 0, qtyUSDT: 0};
}
