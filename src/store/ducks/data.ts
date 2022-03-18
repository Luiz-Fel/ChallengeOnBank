//INTERFACES
export interface DataProps {
    data: {
  
        popularMovies: {
            page: number,
            results: {
    
                id: number,
                title: string,
                vote_average: number,
                poster_path: string,
                overview: string,
                genre_ids: number[],
            }[]
        },
        genres: {
            id: number,
            name: string,
        }[],
        selectedCategoryId: number
    }
  }





export const Types = {
    LOAD_MORE_MOVIES:   '@data/LOAD_MORE_MOVIES',
    GET_MOVIES: '@data/GET_MOVIES',
    GET_GENRES: '@data/GET_GENRES',
    SELECT_CATEGORY: '@data/SELECT_CATEGORY'
}

const INITIAL_STATE = {
    popularMovies: [{}],
    genres: [{}],
    selectedCategoryId: -1,
    
}

export default function data(state = INITIAL_STATE , action: any) {

    switch (action.type) {
        case Types.GET_MOVIES:
           // console.log(action)
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
        
        case Types.SELECT_CATEGORY:
            return {...state, 
                selectedCategoryId: action.category,
            }
        
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
    }),
    selectCategory: (category : number) => ({
        type: Types.SELECT_CATEGORY,
        category,
    })
} 