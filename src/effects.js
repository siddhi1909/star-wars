// IMPORT EXTERNAL LIBRARIES/MODULES
import {useState} from 'react'
// IMPORT API
import {searchPlanets, getPlanetDetails} from './services/api'

export function usePlanetSearch() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [error, setError] = useState('');

    async function searchPlanet(term, page) {
        setIsLoading(true)
        const data = await searchPlanets(term, page);
        setCount(data.count)
        setError(data.error)
        setResults(data.results)
        setIsLoading(false)
    }

    return [{results, isLoading, count, error}, searchPlanet]
}

export function usePlanetDetails() {
    const [planet, setPlanet] = useState(null)
    const [isPlanetLoading, setIsPlanetLoading] = useState(false)

    async function getPlanet(url) {
        if (url === null) {
            setPlanet(null)
        } else {
            setIsPlanetLoading(true)
            const data = await getPlanetDetails(url);
            setPlanet(data.result);
            setIsPlanetLoading(false)
        }
    }

    return [{planet, isPlanetLoading}, getPlanet]
}
