import {heroesFetching, heroesFetched, heroesFetchingError, } from '../components/heroesList/heroesSlice'
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/heroesFiltersSlice'

export const fetchHeroes = (request) => (dispatch) =>{
    dispatch(heroesFetching());

        request("https://vercel-api-github-io.vercel.app/api/data/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) =>{
    dispatch(filtersFetching());

        request("https://vercel-api-github-io.vercel.app/api/data/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}


