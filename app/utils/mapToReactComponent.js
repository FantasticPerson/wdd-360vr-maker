export default function mapToReactComponent(obj,context){
    Object.keys(context).forEach((key)=>{
        obj[key] = context[key]
        if(obj[key] instanceof Function){
            obj[key] = obj[key].bind(obj)
        }
    })
}