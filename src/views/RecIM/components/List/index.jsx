import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Tooltip,
  tooltipClasses,
  ClickAwayListener,
  List,
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import {
  ActivityListing,
  MatchListing,
  ParticipantListing,
  SurfaceListing,
  TeamListing,
  SportListing,
} from './Listing';
import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { standardDate } from '../Helpers';

const ActivityList = ({ activities, showActivityOptions }) => {
  if (!activities?.length)
    return <Typography className={styles.secondaryText}>No activities to show.</Typography>;
  let content = activities.map((activity) => (
    <ActivityListing
      key={activity.ID}
      activity={activity}
      showActivityOptions={showActivityOptions}
    />
  ));
  return <List dense>{content}</List>;
};

const ParticipantList = ({
  participants,
  minimal,
  showParticipantOptions,
  withAttendance,
  attendance,
  isAdmin,
  matchID,
  teamID,
  showInactive,
  callbackFunction,
}) => {
  if (!participants?.length)
    return <Typography className={styles.secondaryText}>No participants to show.</Typography>;
  let content = participants.map((participant) => {
    if (!showInactive && participant.Role === 'Inactive') {
      return null;
    }
    return (
      <ParticipantListing
        key={participant.username}
        participant={participant}
        minimal={minimal}
        withAttendance={withAttendance}
        initialAttendance={
          withAttendance && attendance?.find((att) => att.Username === participant.Username)
        }
        isAdmin={isAdmin}
        matchID={matchID}
        teamID={teamID}
        callbackFunction={(bool) => callbackFunction(bool)}
        showParticipantOptions={
          showParticipantOptions &&
          participant.Role !== 'Team-captain/Creator' &&
          participant.Role !== 'Requested Join' // don't promote people who haven't joined
        }
      />
    );
  });
  return <List dense>{content}</List>;
};

const MatchList = ({ matches, activityID }) => {
  const [selectedSeriesTab, setSelectedSeriesTab] = useState(0);

  if (!matches?.length || !matches[0])
    return <Typography className={styles.secondaryText}>No matches to show.</Typography>;

  let formattedMatches = [];
  matches.forEach((m) => {
    let date = standardDate(m.StartTime, false, true);
    formattedMatches.push({
      ...m,
      DayOfWeek: date.slice(0, 3),
      DayOnly: date.slice(4),
    });
  });

  let organizedMatches = [
    {
      DayOfWeek: formattedMatches[0].DayOfWeek,
      DayOnly: formattedMatches[0].DayOnly,
      Matches: [formattedMatches[0]],
    },
  ];
  let j = 0;
  formattedMatches.forEach((m) => {
    if (organizedMatches[j].DayOnly === m.DayOnly) organizedMatches[j].Matches.push(m);
    else {
      organizedMatches.push({
        DayOfWeek: m.DayOfWeek,
        DayOnly: m.DayOnly,
        Matches: [m],
      });
      j++;
    }
  });

  let content = matches.map((match) => (
    <MatchListing key={match?.ID} match={match} activityID={activityID} />
  ));

  // let matchTabs = (
  //   <>
  //     <Box>
  //       <Tabs
  //         value={selectedSeriesTab}
  //         onChange={(event, tabIndex) => setSelectedSeriesTab(tabIndex)}
  //         variant="scrollable"
  //         scrollButtons="auto"
  //         aria-label="admin control center tabs"
  //       >
  //         {activity.Series.map((series) => {
  //           return <Tab label={series.Name} />;
  //         })}
  //       </Tabs>
  //     </Box>
  //     {activity.Series.map((series, index) => {
  //       return (
  //         <TabPanel value={selectedSeriesTab} index={index}>
  //           <TeamList series={series} />
  //         </TabPanel>
  //       );
  //     })}
  //   </>
  // );

  return <List dense>{content}</List>;
};

// setTargetTeamID is used for edit Match teams
const TeamList = ({ teams, match, series, invite, setInvites, setTargetTeamID }) => {
  const navigate = useNavigate();

  if (!teams?.length && !match && !series)
    return <Typography className={styles.secondaryText}>No teams to show.</Typography>;

  const handleInviteResponse = (response, activityID, teamID) => {
    if (response === 'accepted') {
      navigate(`activity/${activityID}/team/${teamID}`);
    } else if (response === 'rejected') {
      setInvites(teams.filter((team) => team.ID !== teamID));
    }
  };

  var teamStanding;
  if (series) {
    teams = [];
    teamStanding = series.TeamStanding.sort((a, b) => a.WinCount < b.WinCount);
    teamStanding.forEach((team) =>
      teams.push({
        ID: team.TeamID,
        Name: team.Name,
        Activity: {
          ID: series.ActivityID,
        },
        TeamRecord: [
          {
            WinCount: team.WinCount,
            LossCount: team.LossCount,
            TieCount: team.TieCount,
          },
        ],
      }),
    );
  }

  let content = match
    ? match.Team.map((team) => (
        <TeamListing key={team.ID} team={team} match={match} setTargetTeamID={setTargetTeamID} />
      ))
    : teams.map((team) => (
        <TeamListing
          key={team.ID}
          team={team}
          invite={invite ?? false}
          callbackFunction={handleInviteResponse}
        />
      ));
  return <List dense>{content}</List>;
};

const SportList = ({ sports, confirmDelete, editDetails }) => {
  if (!sports?.length)
    return <Typography className={styles.secondaryText}>No sports to show.</Typography>;
  let content = sports.map((sport) => (
    <SportListing sport={sport} confirmDelete={confirmDelete} editDetails={editDetails} />
  ));
  return <List dense>{content}</List>;
};

const SurfaceList = ({ surfaces, confirmDelete, editDetails }) => {
  if (!surfaces?.length)
    return <Typography className={styles.secondaryText}>No surfaces to show.</Typography>;
  let content = surfaces.map((surface) => (
    <SurfaceListing surface={surface} confirmDelete={confirmDelete} editDetails={editDetails} />
  ));
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList, SurfaceList, SportList };
