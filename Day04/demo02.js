const arr =[11,22,33,44,55,66,77,88]

for(const e of arr)
    if(e % 2==0)
        console.log(e)

//when only require for validation/cheking
//use filter()
console.log("using filter ->")

arr.filter((value ,index,Array)=>{
   return value %2 ==0
}).forEach(value=>console.log(value))

//using filter single line code

arr.filter(value=> value%2 !=0).forEach(value =>console.log(value))