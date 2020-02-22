/* eslint-env jest */

const api = require('./api')
// jest.setTimeout(30000);

// The exact same test using async/await
describe('Calls in api.js using async/await', () => {
    it('#searchPlanets() >> should load planet data', async () => {
        const data = await api.searchPlanets('alde',1)
        expect(data).toBeDefined()
        expect(data.results).toBeDefined()
        if(data.results && data.results!=='') {
            for (let planets of data.results) {
                expect(planets.name).toEqual('Alderaan')
            }
        }
    })

    it('#getPlanetDetails() >> should load people data', async () => {
        const data = await api.getPlanetDetails('https://swapi.co/api/planets/9/')
        expect(data).toBeDefined()
        expect(data.result.name).toEqual('Coruscant')
    })
})