import { Divider, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import IMG from 'react-graceful-image';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { Class } from 'services/goStalk';
import userService from 'services/user';
import styles from './PeopleSearchResult.module.css';

/*Const string was created with https://png-pixel.com/ .
 *It is a 1 x 1 pixel with the same color as gordonColors.neutral.lightGray (7/9/21)
 *Although this doesn't use the gordonColors themes directly,
 *the end result is much cleaner and faster than using the placeholderColor tag of react-graceful-image.
 */
const GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/erVfwAJRwPA/3pinwAAAABJRU5ErkJggg==';
const JPG_BASE64_HEADER = 'data:image/jpg;base64,';

const SecondaryText = ({ children, otherProps }) => (
  <Typography variant="body2" color="textSecondary" {...otherProps}>
    {children}
  </Typography>
);

const PeopleSearchResult = ({ Person, size, lazyImages }) => {
  const [avatar, setAvatar] = useState(GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1);
  const [hasBeenRun, setHasBeenRun] = useState(false);

  const loadAvatar = useCallback(async () => {
    const { def: defaultImage, pref: preferredImage } = await userService.getImage(
      Person.AD_Username,
    );

    if (Person.AD_Username) {
      setAvatar(JPG_BASE64_HEADER + (preferredImage || defaultImage));
    }
    setHasBeenRun(true);
  }, [Person.AD_Username]);

  useEffect(() => {
    if (!lazyImages && !hasBeenRun) {
      loadAvatar();
    }
  }, [Person.AD_Username, hasBeenRun, lazyImages, loadAvatar]);

  const handleVisibilityChange = (isVisible) => {
    if (lazyImages && isVisible && !hasBeenRun) loadAvatar();
  };

  const fullName = `${Person.FirstName} ${Person.LastName}`;
  const nickname =
    Person?.NickName && Person.NickName !== Person.FirstName ? `(${Person.NickName})` : null;
  const maidenName =
    Person?.MaidenName && Person.MaidenName !== Person.LastName ? `(${Person.MaidenName})` : null;
  const personClassJobTitle =
    Person.Type === 'Student' ? Class[Person.Class] : Person.JobTitle ?? '';
  const mailLocation =
    Person.Type === 'Student'
      ? `Mailbox #${Person.Mail_Location}`
      : `Mailstop: ${Person.Mail_Location}`;

  let className, gridProps;
  switch (size) {
    case 'single':
      className = styles.people_search_avatar_mobile;
      gridProps = {};
      break;
    case 'largeImages':
      className = styles.people_search_avatar_large;
      gridProps = { xs: 4, container: true, justifyContent: 'flex-end' };
      break;
    default:
      className = styles.people_search_avatar;
      gridProps = { xs: 5, container: true, alignItems: 'center' };
      break;
  }

  return (
    <VisibilitySensor onChange={handleVisibilityChange}>
      <>
        <Divider />
        <Link className="gc360_link" to={`profile/${Person.AD_Username}`}>
          <Grid
            container
            alignItems="center"
            justifyContent={size !== 'full' ? 'center' : null}
            spacing={2}
            style={{
              padding: '1rem',
            }}
          >
            <Grid item {...gridProps}>
              <IMG
                className={className}
                src={avatar}
                alt={'Profile picture for ' + fullName}
                noLazyLoad="true"
                noPlaceHolder="true"
              />
              {size === 'full' && (
                <div>
                  <Typography>
                    {Person.FirstName} {nickname} {Person.LastName} {maidenName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {Person.Email?.includes('.') ? Person.Email : null}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={size === 'full' ? 5 : 8}>
              {size !== 'full' && (
                <Typography variant="h5">
                  {Person.FirstName} {nickname} {Person.LastName} {maidenName}
                </Typography>
              )}
              <Typography>
                {personClassJobTitle ?? Person.Type}
                {Person.Type === 'Alum' && Person.PreferredClassYear
                  ? ' ' + Person.PreferredClassYear
                  : null}
              </Typography>
              <SecondaryText>
                {Person.Major1Description}
                {Person.Major2Description
                  ? (Person.Major1Description ? ', ' : '') + `${Person.Major2Description}`
                  : null}
                {Person.Major3Description ? `, ${Person.Major3Description}` : null}
              </SecondaryText>
              {size !== 'full' && (
                <>
                  <SecondaryText>{Person.Email}</SecondaryText>
                  <SecondaryText>{mailLocation}</SecondaryText>
                </>
              )}
            </Grid>
            {size === 'full' && (
              <Grid item xs={2}>
                <Typography>{mailLocation}</Typography>
              </Grid>
            )}
          </Grid>
        </Link>
        <Divider />
      </>
    </VisibilitySensor>
  );
};

export default PeopleSearchResult;

PeopleSearchResult.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    AD_Username: PropTypes.string.isRequired,
    Nickname: PropTypes.string,
    Type: PropTypes.string.isRequired,
    Class: PropTypes.string,
    JobTitle: PropTypes.string,
    Mail_Location: PropTypes.string,
    PreferredClassYear: PropTypes.string,
    Major1Description: PropTypes.string,
    Major2Description: PropTypes.string,
    Major3Description: PropTypes.string,
  }).isRequired,
  size: PropTypes.string.isRequired,
  lazyImages: PropTypes.bool.isRequired,
};
