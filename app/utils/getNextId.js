export default function getNextId(arr,key,startIndex){
    let id = startIndex;
    arr.map((item)=>{
        if(item[key] > id){
            id = item[key]
        }
    })
    return ++id
}