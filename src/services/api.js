const planetURL = 'https://swapi.co/api/planets';
const axios = require('axios');

export const searchPlanets = async (q, page = 1) => {
    try {
        let res = {};
             res = await axios({
                method: 'get',
                url: `${planetURL}/?search=${q}&page=${page}`,
                timeout: 60 * 4 * 1000,
            });

        const {results = [], count = 0} = res.data;
        const errorMessage = '';

        let planetResults = results.map(char => ({
            ...char,
            // For some reason API doesnt return id
            id: char.url.slice(0, -1).split('/planets/')[1],
        }));
        return {results: [...planetResults], count: count, error: errorMessage};
    } catch (error) {
        let count = 0;
        return {results: [], count: count, error: error.message};
    }
}

export const getPlanetDetails = async url => {
    try {
        const res = await axios({
            method: 'get',
            url: `${url}`,
            timeout: 60 * 4 * 1000,
        });
        const errorMessage = '';

        return {result: res.data || [], error: errorMessage};
    } catch (error) {
        return {results: [], error: error.message};
    }
}
