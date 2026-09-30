import { ArrowUpRight, Compass, Route, MessagesSquare } from "lucide-react";

const paths = [
  { number: "01", icon: Compass, title: "Where could you go?", description: "Compare six destinations, their universities, and the practical details.", href: "#destinations", label: "Explore destinations", image: "/images/destinations/uk.webp", place: "LONDON / UNITED KINGDOM" },
  { number: "02", icon: Route, title: "How do you get there?", description: "See how your profile becomes a shortlist, an application, and a plan.", href: "#process", label: "Follow the journey", image: "/images/destinations/germany.webp", place: "BERLIN / GERMANY" },
  { number: "03", icon: MessagesSquare, title: "What’s right for you?", description: "Talk through your ambitions and budget with one dedicated mentor.", href: "#booking", label: "Start a conversation", image: "/images/destinations/australia.webp", place: "SYDNEY / AUSTRALIA" },
];

export default function ExplorePath() {
  return <section id="explore-path" className="explore-path" aria-labelledby="explore-path-title"><div className="explore-path-inner"><div className="explore-path-heading"><p>YOUR FUTURE, ONE STEP AT A TIME</p><h2 id="explore-path-title">Start with what matters to you.</h2></div><div className="explore-path-grid">{paths.map(path => <a href={path.href} key={path.number} className="explore-path-card"><div className="explore-path-top"><path.icon size={23} /><span>{path.number}</span></div><div className="explore-path-image"><img src={path.image} alt="" loading="lazy" /><span>{path.place}</span></div><h3>{path.title}</h3><p>{path.description}</p><span className="explore-path-link">{path.label}<ArrowUpRight size={18} /></span></a>)}</div></div></section>;
}
