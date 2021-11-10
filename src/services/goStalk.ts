import http from './http';

const enum Class {
  'Unassigned',
  'First Year',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate Student',
  'Undegraduate Conferred',
  'Graduate Conferred',
}

const CSharp = 'C\u266F';

const search = (
  includeStudent: boolean,
  includeFacStaff: boolean,
  includeAlumni: boolean,
  firstName: string,
  lastName: string,
  major: string,
  minor: string,
  hall: string,
  classType: Class,
  homeCity: string,
  state: string,
  country: string,
  department: string,
  building: string,
): Promise<Object[]> => {
  // Sanitize the params sent to the backend -- it can't handle &, /, -, or null/empty strings
  // Therefore we convert all of these things and in the backend we convert them back again

  firstName = firstName
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (firstName === '' || firstName === null) {
    firstName = CSharp;
  }
  lastName = lastName
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (lastName === '' || lastName === null) {
    lastName = CSharp;
  }
  if (major === '' || major === null) {
    major = CSharp;
  } else if (
    major.includes('&') ||
    major.includes('-') ||
    major.includes(':') ||
    major.includes('/')
  ) {
    // workaround to avoid breaking the backend
    major = major.replace('&', '_');
    major = major.replace('-', 'dash');
    major = major.replace(':', 'colon');
    major = major.replace('/', 'slash');
  }
  if (minor === '' || minor === null) {
    minor = CSharp;
  } else if (minor.includes('&')) {
    // workaround to avoid breaking the backend
    minor = minor.replace('&', '_');
  }
  hall = hall.trim();
  if (hall === '' || hall === null) {
    hall = CSharp;
  }
  if (classType === null) {
    // @ts-ignore
    classType = CSharp;
  }
  homeCity = homeCity
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (homeCity === '' || homeCity === null) {
    homeCity = CSharp;
  } else {
    homeCity = homeCity.toLowerCase();
  }
  if (state === '' || state === null) {
    state = CSharp;
  }
  if (country === '' || country === null) {
    country = CSharp;
  }
  if (department === '' || department === null) {
    department = CSharp;
  } else if (department.includes('&')) {
    // workaround to avoid breaking the backend
    department = department.replace('&', '_');
  }
  if (building === '' || building === null) {
    building = CSharp;
  } else if (building.includes('.')) {
    // workaround to avoid breaking the backend
    building = building.replace('.', '_');
  }

  return http.get(
    `accounts/advanced-people-search/${includeStudent}/${includeFacStaff}/${includeAlumni}/${firstName}/${lastName}/${major}/${minor}/${hall}/${classType}/${homeCity}/${state}/${country}/${department}/${building}`,
  );
};

const getMajors = (): Promise<string[]> => {
  return http.get(`advanced-search/majors`);
};

const getMinors = (): Promise<string[]> => {
  return http.get(`advanced-search/minors`);
};

const getHalls = (): Promise<string[]> => {
  return http.get(`advanced-search/halls`);
};

const getStates = (): Promise<string[]> => {
  return http.get(`advanced-search/states`);
};

const getCountries = (): Promise<string[]> => {
  return http.get(`advanced-search/countries`);
};

const getDepartments = (): Promise<string[]> => {
  return http.get(`advanced-search/departments`);
};

const getBuildings = (): Promise<string[]> => {
  return http.get(`advanced-search/buildings`);
};

const advancedSearchService = {
  search,
  getMajors,
  getMinors,
  getHalls,
  getStates,
  getCountries,
  getDepartments,
  getBuildings,
};

export default advancedSearchService;
