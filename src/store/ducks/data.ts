//INTERFACES

interface stateProps {
    popularMovies: {}[],
    genres: {}[],
    searchedMovies: {}[],
}






export const Types = {
    NEW: '@example/NEW_EXAMPLE',
    LOAD_MORE_MOVIES:   '@example/LOAD_MORE_MOVIES',
    GET_MOVIES: '@example/GET_MOVIES',
    GET_GENRES: '@example/GET_GENRES'
}

const INITIAL_STATE = {
    popularMovies: [{}],
    genres: [{}],
    searchedMovies: [{}],
    
}

export default function data(state = INITIAL_STATE , action: any) {

    switch (action.type) {
        case Types.GET_MOVIES:
            console.log(action)
           return {
               ...state,
               popularMovies: action.movies,
           }

        case Types.GET_GENRES:
            return {
                ...state,
                genres: action.genres,
            }
            

        case Types.LOAD_MORE_MOVIES:
            const newMovies: [string] = ['teste']
            return {...state, popularMovies: [...state.popularMovies, ...newMovies]}
        
        default:
            return state;
    }

}


export const Creators = {
    getMovies: (movies: {}[]) => ({
        type: Types.GET_MOVIES,
        movies,
    }),
    getGenres: ({ genres }: { genres: {}[] }) => ({
        type: Types.GET_GENRES,
        genres,
    })
} 