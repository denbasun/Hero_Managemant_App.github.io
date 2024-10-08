import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters} from '../../actions';
import { activeFilterChanged } from './heroesFiltersSlice';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
import './HeroesFilters.scss'

const HeroesFilters = () => {

    const {filters, filterLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
   
    useEffect(() => {
        dispatch(fetchFilters(request)) 
        
    }, []);

    if (filterLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Currently, there are no heroes to select.</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button key={name} id={name} className={btnClass} onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
        })
    }

    const elements = renderFilters(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by element</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;