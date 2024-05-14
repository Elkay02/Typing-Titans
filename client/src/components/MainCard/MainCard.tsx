import { Link } from 'react-router-dom';
import './MainCard.css'


interface MainCardProps {
  title: string;
  imgSrc1?: string;
  imgSrc2?: string;
}

const MainCard = ({ title, imgSrc1, imgSrc2 }: MainCardProps) => {

  return (
  <div className="card-container">
    <h2 className='card-title'>{title}</h2>
      {imgSrc1 && <Link to="/lobby/typing" className='cuac'><img src={imgSrc1} alt='competition icon' className='competition-card-svg' /></Link>}
      {imgSrc2 && <Link to="/lobby/shortcut" className='cuac'><img src={imgSrc2} alt='competition icon' className='competition-card-svg' /></Link>}
  </div>
  )

}

export default MainCard;
