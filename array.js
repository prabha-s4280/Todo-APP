let arr=[1,4,3,"six",true,4]
let indexItem=arr.findIndex(function(eachItem){
    if(eachItem===4){
        return true;
    }
    else{
        return false;
    }
})
console.log(indexItem)