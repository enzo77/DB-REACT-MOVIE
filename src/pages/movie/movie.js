import React, { useState } from 'react'
import { Row , Col, Button } from 'antd'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import useFetch from '../../hooks/useFetch'
import { URL_API , API} from '../../utils/constants'
import Loading from '../../components/Loading'
import ModalVideo from '../../components/ModalVideo'

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
                              <Col span={8} offset={1} className="movie__poster">
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
      const { movieInfo : { id , title , release_date, overview, genres }} = props
      const [isVisibleModal, setIsVisibleModal] = useState(false)
      const videoMovie = useFetch(
            `${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`
      ) 

      const openModal = () => setIsVisibleModal(true)
      const closeModal = () => setIsVisibleModal(false)

      const renderVideo = () => {
            if(videoMovie.result){

                  if(videoMovie.result.results.length > 0){
                        return (
                              <>
                              <Button  onClick={openModal}  icon="play">
                                    Ver Trailer
                              </Button>
                                    <ModalVideo 
                                          videoKey={videoMovie.result.results[0].key}
                                          videoPlatform={videoMovie.result.results[0].site}
                                          isOpen={isVisibleModal}
                                          close={closeModal}
                                    />
                              </>
                        )
                  }
            }
      }

      return (
            <div>
                  <div className="movie__info-header">
                        <h1>{title}</h1>
                        <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
                       {renderVideo()}
                  </div>
                  <div className="movie__info-content">
                  <h3>General</h3>
                  <p>{overview}</p>
                  <h3>Generos</h3>
                  <ul>
                  {
                    genres.map((genre) => <li key={genre.id}>{genre.name}</li> )
                  }
                  </ul>
                  </div>
            </div>
      )
}

