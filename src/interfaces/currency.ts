export interface Currency {
    name: string,
    symbol: string,
    countryCode: string
}

export interface CurrencyResponse {
    message: string,
    data: Currency[]
}