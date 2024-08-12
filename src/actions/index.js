import {heroesFetching, heroesFetched, heroesFetchingError, } from '../components/heroesList/heroesSlice'
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/heroesFiltersSlice'

export const fetchHeroes = (request) => (dispatch) =>{
    dispatch(heroesFetching());

        request("https://my-json-server-github-io.onrender.com/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) =>{
    dispatch(filtersFetching());

        request("https://my-json-server-github-io.onrender.com/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}


