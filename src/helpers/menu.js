const cityMenu = [
    { name: "不分縣市", value: "", image: "./city/city1.jpeg" },
    { name: "臺北市", value: "Taipei", image: "./city/city2.jpeg" },
    { name: "新北市", value: "NewTaipei", image: "./city/city3.jpeg" },
    { name: "桃園市", value: "Taoyuan", image: "./city/city4.jpeg" },
    { name: "臺中市", value: "Taichung", image: "./city/city1.jpeg" },
    { name: "臺南市", value: "Tainan", image: "./city/city2.jpeg" },
    { name: "高雄市", value: "Kaohsiung", image: "./city/city3.jpeg" },
    { name: "基隆市", value: "Keelung", image: "./city/city4.jpeg" },
    { name: "新竹市", value: "Hsinchu", image: "./city/city1.jpeg" },
    { name: "新竹縣", value: "HsinchuCounty", image: "./city/city2.jpeg" },
    { name: "苗栗縣", value: "MiaoliCounty", image: "./city/city3.jpeg" },
    { name: "彰化縣", value: "ChanghuaCounty", image: "./city/city4.jpeg" },
    { name: "南投縣", value: "NantouCounty", image: "./city/city1.jpeg" },
    { name: "雲林縣", value: "YunlinCounty", image: "./city/city2.jpeg" },
    { name: "嘉義縣", value: "ChiayiCounty", image: "./city/city3.jpeg" },
    { name: "嘉義市", value: "Chiayi", image: "./city/city4.jpeg" },
    { name: "屏東縣", value: "PingtungCounty", image: "./city/city1.jpeg" },
    { name: "宜蘭縣", value: "YilanCounty", image: "./city/city2.jpeg" },
    { name: "花蓮縣", value: "HualienCounty", image: "./city/city3.jpeg" },
    { name: "臺東縣", value: "TaitungCounty", image: "./city/city4.jpeg" },
    { name: "金門縣", value: "KinmenCounty", image: "./city/city1.jpeg" },
    { name: "澎湖縣", value: "PenghuCounty", image: "./city/city2.jpeg" },
    { name: "連江縣", value: "LienchiangCounty", image: "./city/city3.jpeg" }
]



const getCityIndexByValue = (value) => {
    let index = cityMenu.findIndex((city) => {
        return city.value === value
    })
    if (index !== -1) {
        return index;
    }
    return 0;
}

const getCityValueByName = (name) => {
    let city = cityMenu.find((city) => {
        return city.name === name
    })
    return city.value;
}

const getCityNameByValue = (value) => {
    let city = cityMenu.find((city) => {
        return city.value === value
    })
    if (city) {
        return city.name;
    }
    return "";
}


const categoryMenu = [
    { name: "景點", value: "scenicSpot" },
    { name: "活動", value: "activity" },
    { name: "美食", value: "restaurant" },
    { name: "住宿", value: "hotel" }
]

export {
    cityMenu,
    categoryMenu,
    getCityNameByValue,
    getCityValueByName,
    getCityIndexByValue
}