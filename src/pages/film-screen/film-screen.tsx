import { SmallFilmCards } from '../../components/small-film-cards/small-film-cards';
import FilmScreenTabs from '../../components/tabs/film-screen-tabs/tabs/film-screen-tabs';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useEffect } from 'react';
import FilmCardDesc from '../../components/film-card-desc';
import FilmCardPoster from '../../components/film-card-poster';
import Spinner from '../../components/spinner/spinner';
import useFilmByParamId from '../../hooks/use-film-by-param-id';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsDataAction, fetchSimilarFilmsDataAction } from '../../store/api-actions';
import { getSimilarFilmData } from '../../store/films-data/selectors';
import { getReviewsData } from '../../store/reviews-data/selectors';
import { clearFilmData } from '../../store/films-data/films-data';

export type FilmScreenProps = {
  maxSimilarCardsCount: number;
};

export default function FilmScreen({ maxSimilarCardsCount }: FilmScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  const filmData = useFilmByParamId();
  const similarFilmsData = useAppSelector(getSimilarFilmData);
  const reviewsData = useAppSelector(getReviewsData);

  useEffect(() => {
    if (filmData) {
      dispatch(fetchSimilarFilmsDataAction(filmData.id));
      dispatch(fetchReviewsDataAction(filmData.id));
    }
  }, [dispatch, filmData]);

  useEffect(() => () => {
    dispatch(clearFilmData());
  }, [dispatch]);

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: filmData?.backgroundColor}}>
        <div className="film-card__hero">
          {filmData &&
            <div className="film-card__bg">
              <img src={filmData.backgroundImage} alt={filmData.name} />
            </div>}

          <h1 className="visually-hidden">WTW</h1>

          <Header className='film-card__head'></Header>

          <div className="film-card__wrap">
            {filmData
              ? <FilmCardDesc {...filmData} />
              : <Spinner />}
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            {filmData
              ?
              <>
                <FilmCardPoster posterImage={filmData.posterImage} name={filmData.name} big />
                <div className="film-card__desc">
                  <FilmScreenTabs filmData={filmData} reviewsData={reviewsData} />
                </div>
              </>
              : <Spinner />}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {filmData
            ? <SmallFilmCards maxCardsCount={maxSimilarCardsCount} filmsData={similarFilmsData} />
            : <Spinner />}
        </section>

        <Footer></Footer>
      </div>
    </>
  );
}
