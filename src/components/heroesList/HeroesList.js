import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchHeroes} from '../../actions';
import {heroDeleted} from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import './heroesList.scss';
import { createSelector } from 'reselect';

const HeroesList = () => {
    const filtredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes, 
        (filter, heroes) => {
            if(filter === 'all'){
                return heroes;
            }else{
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filtredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
    }, []);

    const onDelete = useCallback((id) =>{
        request(`https://my-json-server-github-io.onrender.com/heroes${id}`, 'DELETE')
            .then(data => console.log(data, "Deleted"))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return  <CSSTransition timeout={0}
                        classNames="hero">
                        <h5 className="text-center mt-5">Currently, there are no heroes to select.</h5>
                    </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return  <CSSTransition 
                        key={id}
                        timeout={500}
                        classNames="hero">
                        <HeroesListItem key={id} {...props} onDelete = {() => onDelete(id)}/>
                     </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul" className = 'list'>
            {elements}
         </TransitionGroup>
    )
}

export default HeroesList;