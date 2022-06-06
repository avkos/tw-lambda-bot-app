import axios from 'axios';

class Binance {
    private readonly url: string

    constructor() {
        this.url = 'https://api.binance.com/api/v3';
    }

    async prices(): Promise<TPrices> {
        const pr = await axios.get(`${this.url}/ticker/price`) || {data: []};
        const obj: TPrices = {};

        for (const p of pr.data) {
            obj[p.symbol] = Number(p.price);
        }
        return obj;
    }
}

export default new Binance();
