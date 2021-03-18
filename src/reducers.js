export function reducerData(state, action) {
    let newState = {};
    for (let pair in state) {
      newDataState[pair] = {
        ...state[pair],
        [action.market]: action.rates[pair]
      }
    }
    return newState;
}

export  function reducerValueMin(state, action){
    const entries = Object.entries(action.row);
    let min = entries[0][0];
    for (let [key, value] of entries) {
      if (value < action.row[min]) {
        min = key;
      }
    } 
    return ({...state, [action.key]: min});
}
