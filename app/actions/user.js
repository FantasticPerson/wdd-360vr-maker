import Modals from '../modals'

export function addScene(obj){
    Modals.Scene.add(obj)
    .then(()=>{
        return Modals.Scene.findAll()
    })
    .then((list)=>{
        return (dispatch)=>{
           
        }
    })
}

export function updateScene(obj){
    Modals.Scene.update(obj)
    .then(()=>{
        return Modals.Scene.findAll()
    })
    .then((list)=>{
        return (dispatch)=>{

        }
    })
}

export function updateAllScene(){
    Modals.Scene.findAll()
    .then((list)=>{

    })
}

export function deleteScene(id){
    Modals.Scene.delete(id)
    .then(()=>{
        return Modals.Scene.findAll()
    })
    .then((list)=>{

    })
}