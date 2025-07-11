function pick (obj, keys){
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => keys.includes(key))
    );
}


export default pick;