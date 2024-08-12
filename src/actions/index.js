import {heroesFetching, heroesFetched, heroesFetchingError, } from '../components/heroesList/heroesSlice'
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/heroesFiltersSlice'

export const fetchHeroes = (request) => (dispatch) =>{
    dispatch(heroesFetching());

        request("https://json-server-github-io.vercel.app/heroes")
            .then(data => dispatch(heroesFetched(data.heroes)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) =>{
    dispatch(filtersFetching());

        request("https://json-server-github-io.vercel.app/filters")
            .then(data => dispatch(filtersFetched(data.filters)))
            .catch(() => dispatch(filtersFetchingError()))
}


