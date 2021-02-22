import produce from 'immer'

const initialState = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        id:""        
    },
    history: [
    ],
    cityName: "",
    defaultId: "d2207cf9c493aebf95ff1c1df5618902"
}
export default produce((state, action) => {
    switch (action.type) {
        case 'SET_HISTORY_USER':
            debugger
            if(action.payload!=undefined)
                 state.history = [action.payload].concat(state.history);
            break;
        case 'SET_USER':
            state.user = action.payload;
            break;
    }
}, initialState)