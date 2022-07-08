import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Home, LocationCity, Person } from '@material-ui/icons';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaGlobeAmericas,
  FaHeart,
  FaSchool,
} from 'react-icons/fa';
import Media from 'react-media';
import { useHistory, useLocation } from 'react-router';
import { AuthGroup } from 'services/auth';
import goStalk, { Class } from 'services/goStalk';
import { toTitleCase, searchParamSerializerFactory } from 'services/utils';
import { gordonColors } from 'theme';
import SelectSearchField from './components/SelectSearchField';
import TextSearchField from './components/TextSearchField';

const relationship_statuses = [
  'Single',
  'Taken',
  'Engaged',
  'Married',
  'At DTR Bench Right NOW',
  '1st DTR',
  '2nd DTR',
  'Sat Together At Chapel',
  'Jesus Is My Significant Other',
  'Waiting For Her Boaz',
  'Waiting For His Proverbs 31 Woman',
  "It's Complicated",
];

const searchPageTitle = (
  <div align="center">
    Search the
    <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
    Community
  </div>
);

const initialSearchValues = {
  includeStudent: true,
  includeFacStaff: true,
  includeAlumni: false,
  first_name: '',
  last_name: '',
  major: '',
  minor: '',
  residence_hall: '',
  class_year: '',
  home_town: '',
  state: '',
  country: '',
  department: '',
  building: '',
};

const { serializeSearchParams, deserializeSearchParams } =
  searchParamSerializerFactory(initialSearchValues);

const isTodayAprilFools = () => {
  const todaysDate = new Date();
  return todaysDate.getMonth() === 3 && todaysDate.getDate() === 1;
};

const SearchFields = ({ onSearch, displayLargeImage, setDisplayLargeImage }) => {
  const { profile } = useUser();
  const history = useHistory();
  const location = useLocation();
  const isAlumni = useAuthGroups(AuthGroup.Alumni);
  const isStudent = useAuthGroups(AuthGroup.Student);

  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);

  // Ref is used to only read search params from URL on first load (and on back/forward navigate via event listener)
  const shouldReadSearchParamsFromURL = useRef(true);
  const [searchValues, setSearchValues] = useState(initialSearchValues);

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Prevent search from blank
  const canSearch = useMemo(() => {
    const { includeStudent, includeFacStaff, includeAlumni, ...criteria } = searchValues;

    // Must search some cohort of people
    const includesSomeone = includeStudent || includeFacStaff || includeAlumni;

    // Must search for some non-empty criteria
    const anySearchCriteria = Object.values(criteria).some((c) => c.replace(/[^\w,.'-]/g, ''));

    return includesSomeone && anySearchCriteria;
  }, [searchValues]);

  const search = useCallback(async () => {
    if (canSearch) {
      setLoadingSearch(true);

      await goStalk.search(searchValues).then(onSearch);

      const newQueryString = serializeSearchParams({ ...searchValues });
      // If search params are new since last search, add search to history
      if (location.search !== newQueryString) {
        history.push(`?${newQueryString}`);
      }

      setLoadingSearch(false);
    }
  }, [canSearch, searchValues, onSearch, location.search, history]);

  useEffect(() => {
    const loadPage = async () => {
      const [majors, minors, halls, states, countries, departments, buildings] = await Promise.all([
        goStalk.getMajors(),
        goStalk.getMinors(),
        goStalk.getHalls(),
        goStalk.getStates(),
        goStalk.getCountries(),
        goStalk.getDepartments(),
        goStalk.getBuildings(),
      ]);
      setMajors(majors);
      setMinors(minors);
      setHalls(halls);
      setStates(states);
      setCountries(countries.map((country) => toTitleCase(country)));
      setDepartments(departments);
      setBuildings(buildings);

      if (isAlumni) {
        setSearchValues((sv) => ({ ...sv, includeStudent: false, includeAlumni: true }));
      }

      setLoading(false);
    };

    loadPage();
  }, [isAlumni]);

  useEffect(() => {
    // Read search params from URL on navigate (including first load)
    if (shouldReadSearchParamsFromURL.current) {
      const stateFromQueryString = deserializeSearchParams(new URLSearchParams(location.search));

      setSearchValues((oldSearchValues) => {
        // if new URL has no search params, set search params to initial values
        if (Object.entries(stateFromQueryString).length === 0) {
          return initialSearchValues;
        }

        // Update search params with values from URL query string
        return {
          ...oldSearchValues,
          ...stateFromQueryString,
        };
      });

      shouldReadSearchParamsFromURL.current = false;
    }

    // Read search params from URL on 'popstate' (back/forward navigation) events
    const onNavigate = () => (shouldReadSearchParamsFromURL.current = true);
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, [location.search]);

  if (loading) {
    return <GordonLoader />;
  }

  const handleUpdate = (event) =>
    setSearchValues((sv) => ({
      ...sv,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const PeopleSearchCheckbox = (
    <Grid item xs={12} lg={6} align="center">
      <FormLabel component="label">Include: &nbsp;</FormLabel>
      {loading ? (
        <GordonLoader size={20} />
      ) : (
        <>
          {!isAlumni ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchValues.includeStudent}
                  name="includeStudent"
                  onChange={handleUpdate}
                />
              }
              label="Student"
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={searchValues.includeFacStaff}
                name="includeFacStaff"
                onChange={handleUpdate}
              />
            }
            label="Faculty/Staff"
          />
          {!isStudent ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchValues.includeAlumni}
                  name="includeAlumni"
                  onChange={handleUpdate}
                />
              }
              label="Alumni"
            />
          ) : null}
        </>
      )}
    </Grid>
  );

  return (
    <Card style={{ padding: '0 3vw' }}>
      <CardContent>
        <CardHeader title={searchPageTitle} />

        {/* Search Section 1: General Info */}
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <TextSearchField
              name="first_name"
              value={searchValues.first_name}
              updateValue={handleUpdate}
              Icon={Person}
            />
          </Grid>

          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <TextSearchField
              name="last_name"
              value={searchValues.last_name}
              updateValue={handleUpdate}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectSearchField
              name="residence_hall"
              value={searchValues.residence_hall}
              updateValue={handleUpdate}
              options={halls}
              Icon={FaBuilding}
            />
          </Grid>

          {isTodayAprilFools() ? (
            <Grid item xs={12}>
              <SelectSearchField
                name="relationship_status"
                value={searchValues.relationship_status}
                updateValue={handleUpdate}
                options={relationship_statuses}
                Icon={FaHeart}
              />
            </Grid>
          ) : null}

          {PeopleSearchCheckbox}

          <Media
            query="(min-width: 960px)"
            render={() => (
              <Grid item xs={12} lg={6} align="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={displayLargeImage}
                      onChange={() => setDisplayLargeImage((d) => !d)}
                    />
                  }
                  label="Display Large Images"
                />
              </Grid>
            )}
          />
        </Grid>

        {/* Advanced Filtering */}
        <Grid container align="center">
          <Accordion style={{ flexGrow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="more-search-options-header"
              aria-controls="more-search-options-controls"
            >
              <Typography variant="h6" align="center">
                More Search Options
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} direction="row">
                {/* Advanced Search Filters: Student/Alumni */}
                <Grid item xs={12} md={4}>
                  <Typography
                    align="center"
                    gutterBottom
                    color={
                      searchValues.includeStudent || searchValues.includeAlumni
                        ? 'primary'
                        : 'initial'
                    }
                  >
                    {profile.PersonType === 'stu' ? 'Student' : 'Student/Alumni'}
                  </Typography>
                  <SelectSearchField
                    name="major"
                    value={searchValues.major}
                    updateValue={handleUpdate}
                    options={majors}
                    Icon={FaBook}
                    disabled={!searchValues.includeStudent && !searchValues.includeAlumni}
                  />
                  <SelectSearchField
                    name="minor"
                    value={searchValues.minor}
                    updateValue={handleUpdate}
                    options={minors}
                    Icon={FaBook}
                    disabled={!searchValues.includeStudent}
                  />
                  <SelectSearchField
                    name="class_year"
                    value={searchValues.class_year}
                    updateValue={handleUpdate}
                    options={Object.values(Class).filter((value) => typeof value !== 'number')}
                    Icon={FaSchool}
                    disabled={!searchValues.includeStudent}
                  />
                </Grid>

                {/* Advanced Search Filters: Faculty/Staff */}
                <Grid item xs={12} md={4}>
                  <Typography
                    align="center"
                    gutterBottom
                    color={searchValues.includeFacStaff ? 'primary' : 'initial'}
                  >
                    Faculty/Staff
                  </Typography>
                  <SelectSearchField
                    name="department"
                    value={searchValues.department}
                    updateValue={handleUpdate}
                    options={departments}
                    Icon={FaBriefcase}
                    disabled={!searchValues.includeFacStaff}
                  />
                  <SelectSearchField
                    name="building"
                    value={searchValues.building}
                    options={buildings}
                    Icon={FaBuilding}
                    disabled={!searchValues.includeFacStaff}
                  />
                </Grid>

                {/* Advanced Search Filters: Everyone */}
                <Grid item xs={12} md={4}>
                  <Typography align="center" gutterBottom color="primary">
                    Everyone
                  </Typography>
                  <TextSearchField
                    name="home_town"
                    value={searchValues.home_town}
                    updateValue={handleUpdate}
                    Icon={Home}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <SelectSearchField
                    name="state"
                    value={searchValues.state}
                    updateValue={handleUpdate}
                    options={states}
                    Icon={LocationCity}
                  />
                  <SelectSearchField
                    name="country"
                    value={searchValues.country}
                    updateValue={handleUpdate}
                    options={countries}
                    Icon={FaGlobeAmericas}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={() => setSearchValues(initialSearchValues)}>
          RESET
        </Button>
        {loadingSearch ? (
          <GordonLoader />
        ) : (
          <Button
            color="primary"
            onClick={search}
            fullWidth
            variant="contained"
            disabled={!canSearch}
          >
            SEARCH
          </Button>
        )}
      </CardActions>
      <br />
    </Card>
  );
};

export default SearchFields;
