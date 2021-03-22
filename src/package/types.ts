export type Url = string
export type Fetcher<S = undefined> = (url: Url, options: any) => S
