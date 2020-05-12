import React from 'react'
import { Row , Col, Button } from 'antd'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import useFetch from '../../hooks/useFetch'
import { URL_API , API} from '../../utils/constants'
import Loading from '../../components/Loading'

import "./movie.scss";

export default function Movie() {
      const {id} = useParams()
      const movieInfo = useFetch(`${URL_API}/movie/${id}?api_key=${API}&language=es-ES`)

      if(movieInfo.loading || !movieInfo.result) {
            return <Loading />
      }

      return <RendereMovie movieInfo={movieInfo.result}/>
}
  

function RendereMovie (props){
      const { 
            movieInfo: { poster_path , backdrop_path } 
      } =  props
      const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

      return (
            <div className="movie" style={{ backgroundImage: `url('${backdropPath}')` }}>
                  <div className="movie__dark" />
                  <div className="movie">
                        <Row>
                              <Col span={8} offset={3} className="movie__poster">
                                    <PosterMovie image={poster_path} />
                              </Col>
                              <Col span={8} className="movie__info">
                                   <MovieInfo movieInfo={props.movieInfo} />
                              </Col>
                        </Row>
                  </div>
            </div>
      )
}

function PosterMovie(props) {
      const { image } = props;
      const posterPath = `https://image.tmdb.org/t/p/original${image}`;
    
      return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function MovieInfo(props) { 
      const {movieInfo : { id , title , release_date, overview, genres }} = props
   
      return (
            <>
                  <div className="movie__info-header">
                        <h1>
                              {title}
                        <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
                        </h1>
                  </div>
            </>
      )
}