import React from "react";

const PlanetList = (props) => {
    let planetList = props.planetList;
    let getPlanet = props.getPlanet;
    let width = props.width;

    /*
    * Shows Rainbow colors
    * @return HEX code of Color
    * */
    const rainbowStop = (i) => {
        let h = i * 0.2025;
        let f = (n, k = (n + h * 12) % 12) => .5 - .5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');
        return (rgb2hex(f(0), f(8), f(4)));
    }

    /*
    * @param {population}  population of the planet
    * @return Ratio of Population
    * */
    const widthOnPopulation = (population) => {
        let populationInt = parseInt(population);
        let widthCalc = width - 30;
        /* Divided population of planets in four parts */
        let arrayMilestones = [{p: 10000000, q: 25}, {p: 500000000, q: 50}, {p: 7000000000, q: 75}, { p: 1000000000000, q: 100 }];
        for (let arrayMilestoneElement of arrayMilestones) {
            if (populationInt <= arrayMilestoneElement['p']) {
                return ((populationInt * widthCalc * (arrayMilestoneElement['q'] / 100)) / arrayMilestoneElement['p']) + 'px';
            }
        }
    }
    return(
        <>
            {planetList.length > 0 ? (
                planetList.map((planet, i) => (
                    <div key={i} onClick={e => getPlanet(planet.url)} className="bg-light">
                        {(planet.population !== "unknown") ?
                            (
                                <div className="planet-outer mb-2 rounded"
                                     style={{
                                         width: widthOnPopulation(planet.population),
                                         backgroundColor: rainbowStop(i)
                                     }}
                                >
                                                        <span
                                                            className="planet-title">{planet.name}</span>
                                </div>
                            )
                            :
                            (
                                <div className="planet-outer mb-2 rounded" key={i}
                                     style={{width: '100%', backgroundColor: rainbowStop(i)}}
                                     onClick={e => getPlanet(planet.url)}>
                                                        <span
                                                            className="planet-title">{planet.name} - Population uknown</span>
                                </div>
                            )
                        }
                    </div>
                ))
            ) : (
                <div>No planets</div>
            )}
        </>
    )
}

export default PlanetList;