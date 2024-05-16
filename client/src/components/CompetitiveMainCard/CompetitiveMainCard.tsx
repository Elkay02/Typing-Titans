import "./CompetitiveMainCard.css";
import { Link } from "react-router-dom";
import CompeteCardSVG from "../../assets/CompeteCard.svg";
import ShortcutSVG from "../../assets/shortcut.svg";
import ComingSoonSVG from "../../assets/comingSoon.svg";

const CompetitiveMainCard = () => {
	return (
		<>
			{" "}
			{CompeteCardSVG && (
				<>
					<Link to="/lobby/typing" className="typing-race-card">
						<p className="typing-race-title">Typing Race</p>
						<img
							src={CompeteCardSVG}
							alt="competition card"
							className="competition-card-svg"
						/>
					</Link>
				</>
			)}
			{ShortcutSVG && (
				<>
					<p className="shortcut-race-title">Shortcut Race</p>
					<Link to="/lobby/shortcut" className="shortcut-race-card">
						<img
							src={ShortcutSVG}
							alt="competition card"
							className="competition-card-svg"
						/>
					</Link>
				</>
			)}
			{ComingSoonSVG && (
				<>
					<p className="coming-soon-title">Coming Soon!!!</p>
					<Link to="/lobby/movie" className="coming-soon-card">
						<img
							src={ComingSoonSVG}
							alt="competition card"
							className="competition-card-svg"
						/>
					</Link>
				</>
			)}
		</>
	);
};

export default CompetitiveMainCard;
