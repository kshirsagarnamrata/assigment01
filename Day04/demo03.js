const arr=[11,22,33,44,55,66,77,88]

//display square of all no
for(const e of arr){
    const res =e*e
    console.log(res)
}

console.log("using map")
//to perform only oepration
arr.map((value,index,Array)=>{
    return value *value
}).forEach(value=> console.log(value))


//map in one line of code
arr.map(value=> value*value).forEach(value=>console.log(value))