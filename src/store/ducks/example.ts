export const Types = {
    NEW: '@example/NEW_EXAMPLE',
    LOAD_MOVIES:   '@example/LOAD_MOVIES'
}

const INITIAL_STATE = {
    popularMovies: [],
    
}

export default function example(state = INITIAL_STATE, action: { type: any; }) {
    console.log('Action: ', action);

    switch (action.type) {
        case Types.LOAD_MOVIES:
            const newMovies: [string] = ['teste']
            return {...state, popularMovies: [...state.popularMovies, ...newMovies]}
        
        default:
            return state;
    }

}


export const Creators = {
    loadMovies: () => ({
        type: Types.LOAD_MOVIES,
    })
}