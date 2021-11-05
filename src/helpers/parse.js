const parseJsonToArr = (json) => {
    if (json === null || json === undefined) return [];
    let keys = Object.keys(json);
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
        arr.push(json[keys[i]]);
    }
    return arr;
}

const parseToLocaleTime = (time) => {
    return new Date(time).toLocaleTimeString("zh-tw");
}

export {
    parseJsonToArr,
    parseToLocaleTime
}