import { useEffect, useState } from "react";

const kontestEndpoint = 'https://kontests.net/api/v1/all'

export default function Home({ data }) {
  const [contestData, setContestData] = useState([]);
  useEffect(() => {setContestData(JSON.parse(JSON.stringify(data)));}, []);
  
  return(
    <>
      <section className="hero is-medium is-info block">
        <div className="content hero-body">
          <h5 className="subtitle is-5">Choo Choo! All aboard the</h5>
          <h1 className="title is-1">🚂 CodeTrain</h1>
          <p>Coded by Zeu Capua</p>
          <p>Powered by <a className="is-yellow" href="https://kontests.net">kontests.net</a></p>
        </div>
      </section>
      <div>

      </div>
      <div className="table-container is-flex is-justify-content-center block">
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>CONTEST NAME</th>
              <th>DURATION</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>ORGANIZATION</th>
            </tr>
          </thead>
          <tbody>
            {
              contestData.map(contest => (
                <ContestItem props={contest} />
              ))
            }
          </tbody>
          
        </table>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(kontestEndpoint);
  const data = await response.json();
  return { props: { data } };
}

function ContestItem(contest) {
  const { name, url, status, start_time, end_time, duration, site } = contest.props;
  const startDateObj = new Date(start_time);
  const endDateObj = new Date(end_time);
  const startDate = start_time == "-" || start_time == null ? 'N/A' : startDateObj.toLocaleString();
  const endDate = end_time == "-" || end_time == null ? 'N/A' : endDateObj.toLocaleString();

  var siteUrl = "";
  switch (site) {
    case "HackerRank": siteUrl = "https://hackerrank.com"; break;
    case "CodeChef": siteUrl = "https://codechef.com"; break;
    case "HackerEarth": siteUrl = "https://hackerearth.com"; break;
    case "LeetCode": siteUrl = "https://leetcode.com"; break;
    case "Kick Start": siteUrl = "https://codingcompetitions.withgoogle.com/kickstart/"; break;
    case "CodeForces": siteUrl = "https://codeforces.com"; break;
    default: siteUrl = url;
  }

  return(
    <tr className="is-flex-wrap">
      <td>{ (status == "CODING") ? <span className="tag is-success">ONGOING</span> : <span className="tag is-light">SOON</span> }</td>
      <td><a className="button is-ghost" href={url} target="_blank" rel="noreferrer noopener">{name}</a></td>
      <td>{secondsToDhms(duration)}</td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td><a className="button is-link is-flex" href={siteUrl}>{site}</a></td>
    </tr>
  );
}

/*
Seconds to DHMS string code snippet by Stackoverflow user Andris. https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
*/
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";
  return dDisplay + hDisplay + mDisplay;
}