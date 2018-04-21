import Modals from '../modals';

export function addScene(obj) {
  Modals.Scene.add(obj)
    .then(() => Modals.Scene.findAll())
    .then((list) => (dispatch) => {

    });
}

export function updateScene(obj) {
  Modals.Scene.update(obj)
    .then(() => Modals.Scene.findAll())
    .then((list) => (dispatch) => {

    });
}

export function updateAllScene() {
  Modals.Scene.findAll()
    .then((list) => {

    });
}

export function deleteScene(id) {
  Modals.Scene.delete(id)
    .then(() => Modals.Scene.findAll())
    .then((list) => {

    });
}
