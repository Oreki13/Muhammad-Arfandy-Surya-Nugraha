function CekSimetris(str){
    let reverse = ""
    for(let i = str.length-1; i >= 0; i--){
        reverse += str[i]
    }
    
    return reverse.toLowerCase() === str.toLowerCase()
}

console.log(CekSimetris("KPK"))