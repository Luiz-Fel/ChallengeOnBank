//INTERFACES
export interface DataProps {
    data: {
  
        movies: {
    
            id: number,
            title: string,
            vote_average: number,
            vote_count: number,
            poster_path: string,
            backdrop_path: string,
            overview: string,
            genre_ids: number[],
            popularity: number,
            release_date: string,
        }[],
        genres: {
            id: number,
            name: string,
        }[],
        selectedCategoryId: number,
    }
  }





export const Types = {
    LOAD_MORE_MOVIES:   '@data/LOAD_MORE_MOVIES',
    GET_MOVIES: '@data/GET_MOVIES',
    GET_GENRES: '@data/GET_GENRES',
    SELECT_CATEGORY: '@data/SELECT_CATEGORY',
}

const INITIAL_STATE = {
    movies: [],
    genres: [],
    selectedCategoryId: -1,
    
}

export default function data(state = INITIAL_STATE , action: any) {

    switch (action.type) {
        case Types.GET_MOVIES:
           // console.log(action)
           return {
               ...state,
               movies: action.movies.results,
           }

        case Types.GET_GENRES:
            return {
                ...state,
                genres: action.genres,
            }
            

        case Types.LOAD_MORE_MOVIES:
            //console.log(action)
            return {...state, 
                movies:  [ ...state.movies, ...action.newMovies],
            }
        
        case Types.SELECT_CATEGORY:
            return {...state, 
                selectedCategoryId: action.category,
            }
       
        default:
            return state;
    }

}


export const Creators = {
    getMovies: (movies: DataProps['data']['movies']) => ({
        type: Types.GET_MOVIES,
        movies,
    }),
    getGenres: ({ genres }: DataProps['data']['genres']) => ({
        type: Types.GET_GENRES,
        genres,
    }),
    selectCategory: (category : DataProps['data']['selectedCategoryId']) => ({
        type: Types.SELECT_CATEGORY,
        category,
    }),
    loadMoreMovies: (newMovies : DataProps['data']['movies']) => ({
        type: Types.LOAD_MORE_MOVIES,
        newMovies,
    }),
    
    
} 