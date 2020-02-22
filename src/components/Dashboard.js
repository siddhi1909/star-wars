// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {useState, useEffect, useContext, useRef} from 'react';
import {useHistory} from "react-router-dom";
import {ReactReduxContext, useDispatch} from 'react-redux';
// IMPORT API & ROUTE ACTIONS
import {usePlanetSearch, usePlanetDetails} from '../effects';
import {loginUserFailure} from '../redux/actions/authActions';
import Loader from './Loader'
import PlanetDetail from './PlanetDetail'
import Toast from './Toast'
import Pagination from "./Pagination";
import PlanetList from "./PlanetList";
import SimpleCrypto from "simple-crypto-js";

const Dashboard = () => {
    const {store} = useContext(ReactReduxContext);
    let _secretKey = "siddhi";
    let simpleCrypto = new SimpleCrypto(_secretKey);
    const userName = store.getState().auth.user || (localStorage.getItem('user')?simpleCrypto.decrypt(localStorage.getItem('user')):'');
    const dispatch = useDispatch();
    const [{results, isLoading, count, error}, searchPlanet] = usePlanetSearch();
    const [{planet, isPlanetLoading}, getPlanet] = usePlanetDetails();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const history = useHistory();
    let planetList = [...results] || {};
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [levelToast, setLevelToast] = useState('');
    const [searchCount, setSearchCount] = useState(0);

    useEffect(() => {
        searchPlanet('', 1);
        let widthCalc = ref.current ? ref.current.offsetWidth : 0;
        setWidth(widthCalc);
    }, [ref.current]);

    useEffect(() => {
        if (results && results.length <= 0 && error !== '') {
            showToastFunction(error, 'warning');
        }
    }, [results, error]);

    useEffect(() => {
        if (searchCount > 15) {
            showToastFunction('Sorry! You cannot make more than 15 searched in a minute.', 'warning');
        } else if (showToast) {
            setShowToast(false);
        }
    }, [searchCount]);

    useEffect(() => {
        if (userName !== 'Luke Skywalker') {
            const interval = setInterval(() => {
                setSearchCount(0);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [userName]);

    /*
    * onLogout function for user Loagout
    * */
    const onLogout = () => {
        /* removes user from Localstorage */
        localStorage.removeItem('user');
        dispatch(loginUserFailure());
        history.push("/");
    }

    /*
    * Handles search of Planets
    * @param {e} event Event on input
    * @return nothing
    * */
    const handleSearch = (e) => {
        setCurrentPage(1);
        setSearchText(e.target.value);
        if ((e.target.value.length > 2 || e.target.value.length === 0) &&
            ((userName !== 'Luke Skywalker' && searchCount <= 15) || (userName === 'Luke Skywalker'))
        ) {
            searchPlanet(e.target.value, 1);
            if (userName !== 'Luke Skywalker') {
                setSearchCount(searchCount + 1);
            }
        }
    }

    /*
    * @param {message}  message to show on Toast
    * @param {level}  level of message like success, warning or error
    * */
    const showToastFunction = (message, level) => {
        setLevelToast(level);
        setMessageToast(message);
        setShowToast(true);
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowToast(false);
    //     }, 3000)
    // }, [showToast])

    return (
        <>
            <div className="container-fluid sticky-top navbar-light bg-light padding-top-bottom-10">
                <div className="row">
                    <div className="col-md-3 col-sm-1"></div>
                    <div className="col-md-6 col-sm-8">
                        <input type="text" className="form-control" id="inputSearch"
                               placeholder="Search planets!"
                               value={searchText} onChange={handleSearch}/>
                    </div>
                    <div className="col-md-3 col-sm-3 text-right">
                        <span className="user-dashboard">Hi! {userName}</span>
                        <button onClick={onLogout} className="btn btn-outline-success float-right btn-sm"
                                type="button">Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="container padding-10-0">
                <div className="row">
                    <div className="col-md-7 text-center" ref={ref}>
                        {isLoading ? (
                                <Loader/>
                            ) :
                            (<div className="hide-overflow planet-list-outer">
                                <PlanetList planetList={planetList} getPlanet={getPlanet} width={width}/>
                                <Pagination count={count} recordsPerPage={recordsPerPage} currentPage={currentPage} planetList={planetList} searchText={searchText} setCurrentPage={setCurrentPage} searchPlanet={searchPlanet}/>
                            </div>)
                        }
                    </div>
                    <div className="col-md-5 outer-div text-center">
                        {isPlanetLoading ?
                            (<Loader/>) :
                            <PlanetDetail planet={planet} />
                        }
                    </div>
                </div>
            </div>
            <Toast
                level={levelToast}
                message={messageToast}
                visible={showToast}
            />
        </>
    );
}

export default Dashboard;