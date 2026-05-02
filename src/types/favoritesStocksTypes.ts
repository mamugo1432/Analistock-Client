export interface FavoriteStock{
    idUser:number,
    idStock:string
}

export interface FavoritesStocksContentType{
    postStockFavorite:(infoFavoriteStock:FavoriteStock) => Promise<FavoriteStock>,
    delStockFavorite:(infoFavoriteStock:FavoriteStock) => void,
    loadingPostFavorite:boolean,
    loadingDeleteFavorite:boolean
}