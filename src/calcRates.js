export function calcRates(rates){
    return ({
        "RUB/CUPCAKE": rates.RUB,
        'USD/CUPCAKE': rates.USD,
        'EUR/CUPCAKE': rates.EUR,
        'RUB/USD': rates.RUB / rates.USD,
        'RUB/EUR': rates.RUB / rates.EUR,
        'EUR/USD': rates.EUR / rates.USD
    })
}
