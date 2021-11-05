const restaurantsConvertToSmallRowData = (restaurants) => {
    let data = []
    restaurants.map((restaurant) => {
        data.push(
            {
                pictureUrl1: restaurant.Picture.PictureUrl1,
                name: restaurant.Name,
                address: restaurant.Address
            }
        )
    })
    return data;
}



export {
    restaurantsConvertToSmallRowData
}