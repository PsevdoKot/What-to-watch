import './player-screen.css';
import formatFilmTime from '../../shared/format-film-time';
import useFilmByParamId from '../../hooks/use-film-by-param-id';
import Spinner from '../../components/spinner/spinner';

export default function PlayerScreen(): JSX.Element {
  const filmData = useFilmByParamId();

  return (
    <div className="player">
      {filmData
        ?
        <>
          <video src={filmData.videoLink} className="player__video" poster={filmData.backgroundImage}></video>

          <button type="button" className="player__exit">Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress className="player__progress" value="30" max="100"></progress>
                <div className="player__toggler player__toggler-left">Toggler</div>
              </div>
              <div className="player__time-value">{ formatFilmTime(filmData.runTime) }</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <div className="player__name">Transpotting</div>

              <button type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </>
        : <Spinner />}
    </div>
  );
}
