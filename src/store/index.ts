import { createStore } from "vuex";
import {race} from './modules/race'
const storageKey = 'horseRaceStore'
const store = createStore({
    modules:{
      race
    }
})


// here we are maintaining persisted state using localstorage due to vuex persisted state issues
const state = localStorage.getItem(storageKey)
if(state){
    store.replaceState(Object.assign({}, store.state, JSON.parse(state)))
}

// here we will update localstorage on mutations
store.subscribe((mutation,state)=>{
   localStorage.setItem(storageKey,JSON.stringify(state))
})
export {store}
