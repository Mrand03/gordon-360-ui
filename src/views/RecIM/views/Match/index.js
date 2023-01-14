import { Grid, Typography, Card, CardHeader, CardContent, Breadcrumbs } from '@mui/material';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getMatchByID } from 'services/recim/match';
import { DateTime } from 'luxon';
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const dayMonthDate = (date) => {
  return (
    date.weekdayLong +
    ', ' +
    date.monthLong +
    ' ' +
    date.day +
    ', ' +
    date.toLocaleString(DateTime.TIME_SIMPLE)
  );
};

const RosterCard = ({ participants, teamName }) => (
  <Card>
    <CardHeader title={teamName} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { activityID, matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {

    let mainCard = (
      <Card>
        <CardContent>
        <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter
                  className="gc360_text_link"
                  underline="hover"
                  color="inherit"
                  to={'/recim'}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Rec-IM Home
                </LinkRouter>
                <LinkRouter
                  className="gc360_text_link"
                  underline="hover"
                  color="inherit"
                  to={`/recim/activity/${activityID}`}
                >
                  Activity Name
                </LinkRouter>
                <Typography color="text.primary">Match: Team A vs Team B</Typography>
              </Breadcrumbs>
            </Grid>
            <hr className={styles.recimNavHeaderLine} />
          </Grid>
          <Grid container justifyContent="space-between" marginBottom="10px">
            <Grid item className={styles.grayText}>
              {match.Activity.Name}
            </Grid>
            <Grid item className={styles.grayText}>
              {dayMonthDate(DateTime.fromISO(match.Time))}
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <Grid item xs={2}>
              <Typography variant="h5">{match.Team[0].Name}</Typography>
              <i className={styles.grayText}>Sportsmanship</i>
            </Grid>
            <Grid item xs={2}>
              <img src={''} alt="Team Icon" width="85em"></img>
            </Grid>
            <Grid item container xs={4} sm={2} alignItems="center" direction="column">
              <Typography variant="body" className={styles.grayText}>
                <i>Match status</i>
              </Typography>
              <Typography variant="h5">17 - 38</Typography>
            </Grid>
            <Grid item xs={2}>
              <img src={''} alt="Team Icon" width="85em"></img>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5">{match.Team[1].Name}</Typography>
              <i className={styles.grayText}>Sportsmanship</i>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12}>
            {mainCard}
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[0].Participant} teamName={match.Team[0].Name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[1].Participant} teamName={match.Team[1].Name} />
          </Grid>
        </Grid>
        <Typography>
          Activity ID: {activityID}, Match ID: {matchID} (testing purposes only)
        </Typography>
      </>
    );
  }
};

export default Match;