import { useContext } from "react";
import Localization from "../../context/localization";
import NewImg from'../../images/home/team/James-Seaman.webp'
import { importAllImages } from "../../functions/common";
import styles from "./team.module.css";
import './custom.css'
export default function Team() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const team = [
    {
      name: strings.teamName1,
      title: strings.teamTtl1,
      img: images["home/team/James-Seaman.webp"],
      link: "https://www.linkedin.com/in/swordsofbloodceo/",
    },
    {
      name: strings.teamName2,
      title: strings.teamTtl2,
      img: images["home/team/Jeremy-Brown.webp"],
      link: "https://www.linkedin.com/in/jeremy-brown-29177b3/",
    },
    {
      name: strings.teamName3,
      title: strings.teamTtl3,
      img: images["home/team/Mariusz-Szynalik.webp"],
      link: "https://www.linkedin.com/in/mariusz-szynalik",
    },
    // {
    //   name: strings.teamName4,
    //   title: strings.teamTtl4,
    //   img: images["home/team/Vee-Lozano.webp"],
    // },
    {
      name: strings.teamName10,
      title: strings.teamTtl10,
      bio: strings.teamBio8,
      img: images["home/team/Adam Vine.webp"],
    },
  ];

  return (
    <div className={styles.teamSection}>
      <h1 className={`heading ${styles.heading}`}>{strings.teamTtl}</h1>

      <div className={styles.teamMembers}>
        {team.map((p, i) => {
          return (
            <div key={i} className={styles.teamMember}>
              <img
                loading="lazy"
                src={p.img}
                alt={`${p.name}`}
                className={styles.teamImage}
              />
            </div>
          );
        })}
        <a href="/team/" className={styles.goToTeam+" "+"separate-bx"} style={{position:"relative"}}>
         <div className="data-flex">
            <img src={images["svg/right.svg"]} alt="right" />
            <small>
              Meet the <br /> team behind
            </small>{" "}
            <span>Swords of Blood</span>
         </div>
          <img src={NewImg} alt="" style={{opacity:0,width:"100%",marginBottom:0}} />
        </a>
      </div>
    </div>
  );
}
