export interface Conversion {
    from: string,
    to: string,
    amount: number
}

export interface ConversionResponse {
    message: string,
    data: number
}

export interface ConversionHistory {
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    result: number,
    date: string
}

export interface ConversionHistoryResponse {
    message: string,
    data: ConversionHistory[]
}