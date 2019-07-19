import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LinkIcon from '@material-ui/icons/InsertLink';
import Typography from '@material-ui/core/Typography';

import { ListItemIcon } from '@material-ui/core';

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

// Currently all the URLs in Links tab are hardcoded in this file
// @example
// <List component="nav" subheader={<ListSubheader component="div">Subheader Title goes here</ListSubheader>}>
// <ListItemLink target="_blank" rel="noopener" href="https://www.PutYourURL.com">
//   <ListItemIcon>
//     <img
//       className="css, if we have one"
//       src="https://www.GettheFavicon.com/favicon.ico"
//       alt="Name of the website"
//       width="16"
//       height="16"
//     />
//   </ListItemIcon>
//   <ListItemText primary="Name of the website" />
// </ListItemLink>

export default class GordonLinksList extends Component {
  render() {
    return (
      <Typography>
        <List component="nav" subheader={<ListSubheader component="div">Academics</ListSubheader>}>
          <ListItemLink target="_blank" rel="noopener" href="https://www.gordon.edu">
            <ListItemIcon>
              <img
                className="gordon"
                src={require(`${'../Images/GordonFavicon.ico'}`)}
                alt="gordon"
                width="16"
                height="16"
              />
            </ListItemIcon>
            <ListItemText primary="Gordon College" />
          </ListItemLink>
          <ListItemLink target="_blank" rel="noopener" href="https://my.gordon.edu">
            <ListItemIcon>
              <img
                className="mygordon"
                src={require(`${'../Images/MyGordonFavicon.ico'}`)}
                alt="my gordon"
                width="16"
                height="16"
              />
            </ListItemIcon>
            <ListItemText primary="My Gordon" />
          </ListItemLink>
          <ListItemLink target="_blank" rel="noopener" href="https://go.gordon.edu">
            <ListItemIcon>
              <img
                className="gogordon"
                src={require(`${'../Images/GoGordonFavicon.ico'}`)}
                alt="go gordon"
                width="16"
                height="16"
              />
            </ListItemIcon>
            <ListItemText primary="Go Gordon" />
          </ListItemLink>
          <ListItemLink target="_blank" rel="noopener" href="https://blackboard.gordon.edu">
            <ListItemIcon>
              <img
                className="blackboard"
                src={require(`${'../Images/BbFavicon.ico'}`)}
                alt="blackboard learn"
                width="16"
                height="16"
              />
            </ListItemIcon>
            <ListItemText primary="Blackboard Learn" />
          </ListItemLink>
        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Information</ListSubheader>}
        >
          <ListItemLink target="_blank" rel="noopener" href="http://athletics.gordon.edu//">
            <ListItemIcon>
              <LinkIcon style={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText primary="Fighting Scots" />
          </ListItemLink>
          <ListItemLink target="_blank" rel="noopener" href="http://stories.gordon.edu/">
            <ListItemIcon>
              <LinkIcon style={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText primary="The Bell" />
          </ListItemLink>
          <ListItemLink target="_blank" rel="noopener" href="https://www.gordon.edu/titleix">
            <ListItemIcon>
              <LinkIcon style={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText primary="Sexual Discrimination and Harassment" />
          </ListItemLink>
        </List>
      </Typography>
    );
  }
}
