import "./style.scss";
import { Map } from '@pbe/react-yandex-maps';
import images from "../../images";
import { formatNumber } from "../../utils/formatNumber";

export default function YandexMap(
  {
    coordinates = [],
    info = {},
  }
) {

  return (
    <div className="info">
      {coordinates.length !== 0 ?
        <Map state={{ center: coordinates, zoom: 9 }} />
        :
        <p className="info__notMap">С сервера не пришли координаты столицы</p>
      }
      <div className="info__country">
        <img src={info.coatOfArms ? info.coatOfArms : images.emptyEmblem} alt="герб" className="info__emblem" />
        <p>Столица: <b>{info.capital}</b></p>
        <p>Численность населения: <b>{formatNumber(info.population)}</b> чел.</p>
        <p>Площадь: <b>{formatNumber(info.area)}</b> кв.км.</p>
        <p>Плотность населения: <b>{Math.round(info.population / info.area)}</b> чел./кв.км.</p>
      </div>
    </div>
  )
}