import React from 'react'
import {Row, Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";
import './MovieCatalog.scss'

export default function MovieCatalog(props) { 
    const {movie : { results }} = props

    return results.map(movie => (
  	    <Row>
			<Col key={movie.id}  span={4} className="movie-catalog">
				<MovieCard movie={movie} />
        	</Col>
		</Row>
      ));
}


function MovieCard(props) {
    const {
        movie: { id, title, poster_path }
      } = props;
      const { Meta } = Card;
      const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

    return (
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={posterPath} />}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
}