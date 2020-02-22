import React from "react";

const PlanetDetail = (props) => {
    let planet = props.planet;
    return(
        <>
            {(planet !== null && planet !== '') ?
                <div className="text-left">
                    <h4 className="card-title"> {planet.name}</h4>
                    <div className="card-text"><b>Diameter:</b> {planet.diameter}</div>
                    <div className="card-text"><b>Rotation period:</b> {planet.rotation_period}
                    </div>
                    <div className="card-text"><b>Orbital period:</b> {planet.orbital_period}</div>
                    <div className="card-text"><b>Climate:</b> {planet.climate}</div>
                    <div className="card-text"><b>Gravity:</b> {planet.gravity}</div>
                    <div className="card-text"><b>Terrain:</b> {planet.terrain}</div>
                    <div className="card-text"><b>Surface water:</b> {planet.surface_water}</div>
                    <div className="card-text"><b>Population:</b> {planet.population}</div>
                    {planet && planet.residents && planet.residents.length > 0 ? (
                        <div className="card-text"><b>Residents:</b>
                            {
                                planet.residents.map((resident, i) => (
                                    <div key={i}>{resident}</div>
                                ))
                            }
                        </div>) : ''}
                    {planet && planet.films && planet.films.length > 0 ? (
                        <div className="card-text"><b>Films:</b>
                            {
                                planet.films.map((film, i) => (
                                    <div key={i}>{film}</div>
                                ))
                            }
                        </div>) : ''}
                </div>
            : ''
            }
            </>
    )
}

export default PlanetDetail;