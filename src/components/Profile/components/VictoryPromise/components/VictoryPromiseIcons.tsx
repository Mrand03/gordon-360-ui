import { Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import { toTitleCase } from 'services/utils';
import { Colors, VictoryPromiseCategory, VictoryPromiseColor } from 'services/victoryPromise';
import styles from './VictoryPromiseIcon.module.css';

const CategoryDescription = {
  christian_character:
    'Opportunities encouraging faith formation and its connection to living, learning and leading with others',
  intellectual_maturity:
    'Opportunities to extend critical reasoning, deepen understanding, and ignite imagination',
  lives_of_service:
    "Opportunities to lend one's strengths and talents with our partners to our neighbors",
  leadership_worldwide:
    "Opportunities to develop one's understanding and influence in God's amazing, dynamic and challenging world",
};

const VictoryPromiseIcon = ({
  category,
  active,
}: {
  category: VictoryPromiseCategory;
  active: boolean;
}) => {
  const primary = active ? Colors[category] : '#014983';
  const secondary = active ? '#ffffff' : '#CCCCCB';
  const IconComponent = CategoryIcon[category];
  return (
    <Tooltip
      title={
        <>
          <Typography>{toTitleCase(category, '_')}</Typography>
          {CategoryDescription[category]}
        </>
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="102" height="109" className={styles.icon}>
        <g>
          <IconComponent primary={primary} secondary={secondary} />
        </g>
      </svg>
    </Tooltip>
  );
};

type PrimaryColor = VictoryPromiseColor | '#014983';
type SecondaryColor = '#CCCCCB' | '#ffffff';

type IconProps = {
  primary: PrimaryColor;
  secondary: SecondaryColor;
};

const ChristianCharacterIcon = ({ primary, secondary }: IconProps) => {
  return (
    <>
      <polygon
        points="34.01234357059002,29.184961766004562 34.01234357059002,85.82496497035027 40.26234357059002,85.82496497035027 40.26234357059002,97.0649628341198 46.74234311282635,94.41496130824089 53.21234433352947,97.0649628341198 53.21234433352947,85.82496497035027 73.64234463870525,85.82496497035027 73.64234463870525,29.184961766004562 34.01234357059002,29.184961766004562 "
        fill={primary}
      />
      <path
        d="m33.183054,80.402831l34.36,0l0,-50.31l-34.36,0l0,50.31zm35.76,2.79l-37.16,0a1.39,1.39 0 0 1 -1.39,-1.39l0,-53.1a1.4,1.4 0 0 1 1.39,-1.4l37.16,0a1.4,1.4 0 0 1 1.39,1.4l0,53.1a1.39,1.39 0 0 1 -1.39,1.39"
        fill={secondary}
      />
      <path
        d="m58.173054,51.912831a1.39,1.39 0 0 0 -1.39,-1.39l-5,0l0,-7.71a1.4,1.4 0 0 0 -2.79,0l0,7.73l-5,0a1.4,1.4 0 1 0 0,2.79l5,0l0,13a1.4,1.4 0 0 0 2.79,0l0,-13l5,0a1.4,1.4 0 0 0 1.39,-1.42"
        fill={secondary}
      />
    </>
  );
};

const IntellectualMaturityIcon = ({ primary, secondary }: IconProps) => {
  return (
    <>
      <path
        fill={primary}
        d="m81.45,61.75a6.49,6.49 0 0 0 -4,-6a6.5,6.5 0 0 0 -5.72,-5.06a6.48,6.48 0 0 0 -9.56,-3.18a7.69,7.69 0 0 0 -11.05,0.68a7.92,7.92 0 0 0 -12.12,3.49a6.72,6.72 0 0 0 -8.39,5.84a6.49,6.49 0 0 0 -2.71,11.41a7.45,7.45 0 0 0 12.24,5.64a8,8 0 0 0 7.65,5.59c2.45,0 2.87,-0.22 4.34,-2l13.18,11.4l4.27,-3.78l-4.3,-3.72a8,8 0 0 0 2.61,0.44a8.14,8.14 0 0 0 8.11,-8.15a7.26,7.26 0 0 0 -0.06,-0.93a6.49,6.49 0 0 0 5.51,-6.42a6.56,6.56 0 0 0 -0.56,-2.63a6.64,6.64 0 0 0 0.56,-2.64"
      />
      <path
        fill={secondary}
        d="m37.43,71.79a1.26,1.26 0 0 1 -0.67,-0.19a1.28,1.28 0 0 1 -0.42,-1.75a9.77,9.77 0 0 1 13.42,-3.23a1.27,1.27 0 1 1 -1.33,2.17a7.22,7.22 0 0 0 -9.91,2.39a1.28,1.28 0 0 1 -1.09,0.61"
      />
      <path
        fill={secondary}
        d="m48.59,73.37a1.27,1.27 0 0 1 0.83,0.31l12.32,10.64l2.35,-2.08l-3.2,-2.76a1.28,1.28 0 0 1 1.24,-2.18a6.69,6.69 0 0 0 2.2,0.37a6.83,6.83 0 0 0 6.82,-7.67a1.28,1.28 0 0 1 1.07,-1.4a5.19,5.19 0 0 0 4.4,-5.15a5.13,5.13 0 0 0 -0.45,-2.11a1.26,1.26 0 0 1 0,-1a5.13,5.13 0 0 0 0.45,-2.11a5.22,5.22 0 0 0 -3.21,-4.82a1.26,1.26 0 0 1 -0.76,-0.9a5.19,5.19 0 0 0 -4.6,-4.06a1.29,1.29 0 0 1 -1.05,-0.85a5.21,5.21 0 0 0 -7.7,-2.6a1.27,1.27 0 0 1 -1.54,-0.13a6.42,6.42 0 0 0 -9.23,0.57a1.27,1.27 0 0 1 -1.72,0.19a6.65,6.65 0 0 0 -10.17,2.92a1.27,1.27 0 0 1 -1.5,0.77a5.42,5.42 0 0 0 -6.81,4.73a1.27,1.27 0 0 1 -1,1.12a5.23,5.23 0 0 0 -4.13,5.1a5.17,5.17 0 0 0 2,4.07a1.29,1.29 0 0 1 0.47,1a6.17,6.17 0 0 0 10.1,4.66a1.29,1.29 0 0 1 1.23,-0.21a1.27,1.27 0 0 1 0.86,0.84a6.72,6.72 0 0 0 6.43,4.7c2.1,0 2.15,-0.06 3.37,-1.51a1.29,1.29 0 0 1 0.88,-0.44l0.1,0m13.11,13.9a1.26,1.26 0 0 1 -0.83,-0.31l-12.23,-10.55c-1.22,1.21 -2.16,1.46 -4.45,1.46a9.25,9.25 0 0 1 -8.24,-4.94a8.72,8.72 0 0 1 -12.92,-7a7.76,7.76 0 0 1 2.83,-13a8,8 0 0 1 8.77,-6.26a9.19,9.19 0 0 1 12.71,-3.68a9,9 0 0 1 11.37,-0.57a7.7,7.7 0 0 1 3.34,-0.76a7.8,7.8 0 0 1 6.95,4.33a7.71,7.71 0 0 1 5.95,5.3a7.76,7.76 0 0 1 3.74,9.53a7.87,7.87 0 0 1 0.46,2.63a7.72,7.72 0 0 1 -5.42,7.4a9.43,9.43 0 0 1 -8.19,9.28l1.3,1.12a1.26,1.26 0 0 1 0.44,1a1.28,1.28 0 0 1 -0.43,1l-4.3,3.74a1.25,1.25 0 0 1 -0.85,0.32"
      />
      <path
        fill={secondary}
        d="m63.245844,71.534156a8.31,8.31 0 0 1 -8.3,-8.3a1.28,1.28 0 0 1 2.55,0a5.76,5.76 0 0 0 5.75,5.75a1.28,1.28 0 0 1 0,2.55"
      />
      <path
        fill={secondary}
        d="m42.48,56.42a8.31,8.31 0 0 1 -8.3,-8.3a1.28,1.28 0 0 1 2.55,0a5.76,5.76 0 0 0 5.75,5.75a1.28,1.28 0 0 1 0,2.55"
      />
      <path
        fill={secondary}
        d="m65.31,63.92a1.27,1.27 0 0 1 -1.31,-1.27a11,11 0 0 1 11,-10.96a1.28,1.28 0 1 1 0,2.55a8.42,8.42 0 0 0 -8.41,8.41a1.27,1.27 0 0 1 -1.27,1.27"
      />
      <path
        fill={secondary}
        d="m72.24,71.4l-17.67,0a1.27,1.27 0 1 1 0,-2.54l17.67,0a1.27,1.27 0 1 1 0,2.54"
      />
      <path
        fill={secondary}
        d="m39,61.06a1.28,1.28 0 0 1 -1.28,-1.28l0,-5.58a1.28,1.28 0 1 1 2.55,0l0,5.58a1.27,1.27 0 0 1 -1.27,1.28"
      />
      <path
        fill={secondary}
        d="m44.89,67.55a1.32,1.32 0 0 1 -0.69,-0.2a1.28,1.28 0 0 1 -0.39,-1.76l3,-4.71a1.27,1.27 0 0 1 2.19,1.37l-3,4.75a1.26,1.26 0 0 1 -1.07,0.59"
      />
      <path
        fill={secondary}
        d="m24.39,66.81a1.3,1.3 0 0 1 -1.11,-0.63a1.28,1.28 0 0 1 0.47,-1.74l5.84,-3.44a1.27,1.27 0 0 1 1.28,2.2l-5.87,3.44a1.23,1.23 0 0 1 -0.64,0.17"
      />
      <path
        fill={secondary}
        d="m67.59,56.53l-0.12,0l-4.89,-0.46a1.28,1.28 0 0 1 0.24,-2.54l4.89,0.46a1.28,1.28 0 0 1 -0.12,2.55"
      />
      <path
        fill={secondary}
        d="m70.26,63.76a1.25,1.25 0 0 1 -0.78,-0.27l-3.88,-3a1.28,1.28 0 0 1 1.57,-2l3.87,3a1.27,1.27 0 0 1 0.23,1.79a1.3,1.3 0 0 1 -1,0.49"
      />
      <path
        fill={secondary}
        d="m57.67,53.85a1.27,1.27 0 0 1 -1.24,-1l-1.06,-4.79a1.27,1.27 0 1 1 2.48,-0.55l1.07,4.79a1.27,1.27 0 0 1 -1,1.52a1.33,1.33 0 0 1 -0.28,0"
      />
      <path
        fill={secondary}
        d="m52.07,52.91a1.28,1.28 0 0 1 -1,-2.09l6.31,-7.58a1.28,1.28 0 1 1 2,1.64l-6.32,7.57a1.27,1.27 0 0 1 -1,0.46"
      />
      <path
        fill={secondary}
        d="m50.78,36.78a1.28,1.28 0 0 1 -1.28,-1.28l0,-12.64a1.28,1.28 0 1 1 2.55,0l0,12.64a1.27,1.27 0 0 1 -1.27,1.28"
      />
      <path
        fill={secondary}
        d="m81.45,54a1.28,1.28 0 0 1 -0.4,-2.49l7.7,-2.5a1.27,1.27 0 1 1 0.79,2.42l-7.7,2.5a1.07,1.07 0 0 1 -0.39,0.07"
      />
      <path
        fill={secondary}
        d="m75.72,45.8a1.29,1.29 0 0 1 -1,-0.53a1.28,1.28 0 0 1 0.28,-1.78l3.54,-2.57a1.27,1.27 0 0 1 1.46,2.08l-3.54,2.57a1.23,1.23 0 0 1 -0.75,0.25"
      />
      <path
        fill={secondary}
        d="m68.9,39a1.24,1.24 0 0 1 -0.75,-0.24a1.28,1.28 0 0 1 -0.28,-1.76l6.47,-8.9a1.27,1.27 0 0 1 2.06,1.5l-6.47,8.9a1.28,1.28 0 0 1 -1,0.52"
      />
      <path
        fill={secondary}
        d="m59.6,36.78a1.39,1.39 0 0 1 -0.4,-0.06a1.29,1.29 0 0 1 -0.82,-1.61l1.47,-4.51a1.27,1.27 0 1 1 2.42,0.79l-1.46,4.51a1.28,1.28 0 0 1 -1.21,0.88"
      />
      <path
        fill={secondary}
        d="m19.39,53.72a1.39,1.39 0 0 1 -0.4,-0.06l-7,-2.27a1.27,1.27 0 1 1 0.81,-2.39l7,2.27a1.26,1.26 0 0 1 0.82,1.6a1.28,1.28 0 0 1 -1.21,0.88"
      />
      <path
        fill={secondary}
        d="m25.83,45.8a1.25,1.25 0 0 1 -0.75,-0.25l-3.91,-2.84a1.27,1.27 0 0 1 1.5,-2.06l3.91,2.84a1.28,1.28 0 0 1 0.28,1.78a1.29,1.29 0 0 1 -1,0.53"
      />
      <path
        fill={secondary}
        d="m33.72,40.44a1.27,1.27 0 0 1 -1,-0.52l-7.57,-10.37a1.27,1.27 0 0 1 2.06,-1.5l7.54,10.37a1.28,1.28 0 0 1 -0.28,1.78a1.31,1.31 0 0 1 -0.75,0.24"
      />
      <path
        fill={secondary}
        d="m42,36.78a1.28,1.28 0 0 1 -1.22,-0.88l-1.64,-4.9a1.28,1.28 0 0 1 2.43,-0.78l1.6,4.93a1.28,1.28 0 0 1 -0.82,1.61a1.32,1.32 0 0 1 -0.39,0.06"
      />
    </>
  );
};

const LivesOfServiceIcon = ({ primary, secondary }: IconProps) => {
  return (
    <>
      <path
        d="m10.957896,90l0,-4.4c0,-1.73 1.06,-13.15 14.07,-13.15s14.49,11.33 14.49,13.14l0,4.41"
        fill={primary}
      />
      <path
        d="m66.129299,90l0,-4.4c0,-1.73 1.07,-13.15 14.08,-13.15s14.45,11.33 14.45,13.14l0,4.41"
        fill={primary}
      />
      <path
        d="m38.077896,90l0,-8.34c0,-1.73 1.07,-13.14 14.07,-13.14s14.46,11.34 14.46,13.14l0,8.34"
        fill={primary}
      />
      <path
        d="m55.099299,62.76q-0.33,0.09 -0.66,0.15l-0.41,0.09a9.32,9.32 0 0 1 -1.4,0.1l-0.17,0a8.76,8.76 0 0 1 -1,-0.08a9.27,9.27 0 0 1 -7,-5.11l0,0a2.79,2.79 0 0 1 -0.15,-0.3l-0.15,-0.37c-0.11,-0.3 -0.19,-0.56 -0.19,-0.56l0,0a8.15,8.15 0 0 1 -0.33,-1.4a0.07,0.07 0 0 1 0,0a11.38,11.38 0 0 1 -0.1,-1.31l0,-0.08a10.24,10.24 0 0 1 0.11,-1.35a9.26,9.26 0 0 1 6.58,-7.54q0.33,-0.09 0.66,-0.15l0.4,-0.08a9.57,9.57 0 0 1 1.41,-0.11l0.14,0a8.76,8.76 0 0 1 1,0.09a9.25,9.25 0 0 1 7,5.11l0,0a3,3 0 0 1 0.15,0.31c0,0.12 0.1,0.24 0.14,0.36l0.2,0.56l0,0a8.38,8.38 0 0 1 0.33,1.4l0,0.05a11.55,11.55 0 0 1 0.1,1.31l0,0.08a8.79,8.79 0 0 1 -0.12,1.35a9.24,9.24 0 0 1 -6.64,7.49"
        fill={primary}
      />
      <path
        d="m82.839299,66.68a6.37,6.37 0 0 1 -0.66,0.16l-0.4,0.08a9.57,9.57 0 0 1 -1.41,0.11l-0.17,0c-0.35,0 -0.69,0 -1,-0.09a9.25,9.25 0 0 1 -7,-5.11l0,0a1.8,1.8 0 0 1 -0.14,-0.31c-0.06,-0.12 -0.1,-0.24 -0.15,-0.37c-0.11,-0.29 -0.2,-0.55 -0.2,-0.55l0,0a8.62,8.62 0 0 1 -0.33,-1.4a0.07,0.07 0 0 0 0,0a9.72,9.72 0 0 1 -0.09,-1.31s0,-0.06 0,-0.08a10.11,10.11 0 0 1 0.12,-1.35a9.24,9.24 0 0 1 6.64,-7.49l0.66,-0.16l0.41,-0.08a9.55,9.55 0 0 1 1.41,-0.1l0.16,0c0.35,0 0.69,0 1,0.09a9.24,9.24 0 0 1 7,5.11l0,0a2.79,2.79 0 0 1 0.15,0.3l0.15,0.37c0.11,0.29 0.19,0.56 0.19,0.56l0,0a9.77,9.77 0 0 1 0.32,1.4a0.11,0.11 0 0 1 0,0.05a9.77,9.77 0 0 1 0.1,1.32l0,0.07a8.81,8.81 0 0 1 -0.11,1.36a9.25,9.25 0 0 1 -6.65,7.42"
        fill={primary}
      />
      <path
        d="m23.26,66.68c0.22,0.06 0.44,0.12 0.66,0.16l0.41,0.08a9.57,9.57 0 0 0 1.41,0.11l0.17,0c0.34,0 0.68,0 1,-0.09a9.21,9.21 0 0 0 7,-5.11l0,0l0.14,-0.31l0.15,-0.37c0.11,-0.29 0.19,-0.55 0.19,-0.55l0,0a9.77,9.77 0 0 0 0.32,-1.4a0.11,0.11 0 0 0 0,0a9.75,9.75 0 0 0 0.1,-1.31l0,-0.08a8.68,8.68 0 0 0 -0.11,-1.35a9.23,9.23 0 0 0 -6.65,-7.49l-0.66,-0.16l-0.4,-0.08a9.55,9.55 0 0 0 -1.41,-0.1l-0.17,0c-0.34,0 -0.69,0 -1,0.09a9.27,9.27 0 0 0 -7,5.11l0,0a2.79,2.79 0 0 0 -0.15,0.3c-0.05,0.12 -0.09,0.24 -0.14,0.37c-0.11,0.29 -0.2,0.56 -0.2,0.56l0,0a8.62,8.62 0 0 0 -0.33,1.4a0.07,0.07 0 0 1 0,0.05a9.76,9.76 0 0 0 -0.09,1.32s0,0 0,0.07a10.26,10.26 0 0 0 0.12,1.36a9.24,9.24 0 0 0 6.64,7.48"
        fill={primary}
      />
      <path
        d="m63.16,87.69415a1.47,1.47 0 0 1 -1.47,-1.47l0,-8.32c0,-0.12 -0.35,-11.67 -13,-11.67c-12.46,0 -12.6,11.19 -12.6,11.67l0,8.32a1.47,1.47 0 0 1 -2.94,0l0,-8.32c0,-0.15 0.18,-14.62 15.54,-14.62c13,0 15.92,10.83 15.92,14.62l0,8.32a1.47,1.47 0 0 1 -1.47,1.47"
        fill={secondary}
      />
      <path
        d="m42,53.36a7.92,7.92 0 0 0 6.75,4.34l0.16,0a5.08,5.08 0 0 0 1.17,-0.08l0.17,0l0.17,0l0.56,-0.13a7.79,7.79 0 0 0 5.58,-6.3a7.47,7.47 0 0 0 0.06,-1.19a8.49,8.49 0 0 0 -0.08,-1.17a0.17,0.17 0 0 1 0,-0.07a10.16,10.16 0 0 0 -0.27,-1.15l0,0c0,-0.07 -0.09,-0.26 -0.17,-0.47l-0.1,-0.32a1.48,1.48 0 0 0 -0.09,-0.18l-0.06,-0.13a7.76,7.76 0 0 0 -5.88,-4.25a8.09,8.09 0 0 0 -0.86,-0.07l-0.16,0a7.59,7.59 0 0 0 -1.17,0.09l-0.17,0l-0.17,0l-0.56,0.13a7.75,7.75 0 0 0 -5.57,6.29a6.6,6.6 0 0 0 -0.1,1.14a8.49,8.49 0 0 0 0.08,1.17a0.13,0.13 0 0 1 0,0.06a9.85,9.85 0 0 0 0.27,1.16l0,0l0.17,0.48l0.11,0.29a0.87,0.87 0 0 0 0.09,0.17l0,0a0.34,0.34 0 0 1 0.06,0.12m9.37,5.48l0,0zm-2.48,1.81l-0.18,0a11.77,11.77 0 0 1 -1.21,-0.1a10.65,10.65 0 0 1 -8.15,-5.92a3.21,3.21 0 0 1 -0.18,-0.37c0,-0.11 -0.09,-0.22 -0.14,-0.34a0.69,0.69 0 0 0 0,-0.1c-0.11,-0.29 -0.19,-0.55 -0.21,-0.6l0,0a9.91,9.91 0 0 1 -0.38,-1.61s0,-0.08 0,-0.11a9.66,9.66 0 0 1 -0.19,-1.43a9.88,9.88 0 0 1 0.13,-1.66a10.71,10.71 0 0 1 7.7,-8.68q0.39,-0.1 0.78,-0.18l0.1,0l0.36,-0.07a10.78,10.78 0 0 1 1.63,-0.12s0.15,0 0.18,0a9.67,9.67 0 0 1 1.21,0.11a10.68,10.68 0 0 1 8.16,5.92l0,0c0,0.1 0.11,0.22 0.16,0.35l0.15,0.35l0.24,0.67l0,0.05a10.55,10.55 0 0 1 0.38,1.62s0,0.08 0,0.11a10.89,10.89 0 0 1 0.1,1.47a9.92,9.92 0 0 1 -0.13,1.67a10.68,10.68 0 0 1 -7.7,8.67l0,0l-0.76,0.18l-0.11,0l-0.36,0.07a11,11 0 0 1 -1.63,0.12"
        fill={secondary}
      />
      <path
        d="m90.9,87.53a1.47,1.47 0 0 1 -1.48,-1.47l0,-4.4c0,-0.11 -0.35,-11.67 -13,-11.67a13.06,13.06 0 0 0 -8.11,2.38a1.47,1.47 0 1 1 -1.76,-2.37a15.89,15.89 0 0 1 9.89,-3c13,0 15.93,10.82 15.93,14.61l0,4.4a1.47,1.47 0 0 1 -1.47,1.47"
        fill={secondary}
      />
      <path
        d="m69.69,57.26a7.76,7.76 0 0 0 5.91,4.29a6,6 0 0 0 0.85,0.07l0.18,0a7.43,7.43 0 0 0 1.15,-0.09l0.17,0l0.17,0l0.56,-0.13a7.75,7.75 0 0 0 5.58,-6.29a9.6,9.6 0 0 0 0.1,-1.14a10.31,10.31 0 0 0 -0.09,-1.17s0,-0.08 0,-0.11a7.61,7.61 0 0 0 -0.27,-1.14l0,0s-0.08,-0.25 -0.18,-0.51l-0.11,-0.29a0.91,0.91 0 0 0 -0.08,-0.17s-0.05,-0.09 -0.07,-0.14a7.73,7.73 0 0 0 -5.88,-4.24a8.08,8.08 0 0 0 -0.86,-0.08l-0.16,0a7.36,7.36 0 0 0 -1.16,0.09l-0.18,0l-0.17,0l-0.56,0.13a7.75,7.75 0 0 0 -5.59,6.35a6.57,6.57 0 0 0 -0.1,1.13a7.13,7.13 0 0 0 0.1,1.18a7.26,7.26 0 0 0 0.27,1.2l0,0a5,5 0 0 0 0.17,0.49l0.12,0.29l0.07,0.17a0.47,0.47 0 0 1 0,0.1m9.38,5.5l0,0zm-2.48,1.81l-0.18,0a9.67,9.67 0 0 1 -1.21,-0.11a10.68,10.68 0 0 1 -8.14,-5.91c-0.05,-0.11 -0.12,-0.24 -0.17,-0.38a2.37,2.37 0 0 1 -0.13,-0.32a0.69,0.69 0 0 1 0,-0.1c-0.12,-0.32 -0.22,-0.6 -0.22,-0.62l0,0a10.28,10.28 0 0 1 -0.38,-1.62s0,-0.09 0,-0.11a10.28,10.28 0 0 1 0,-3.13a10.71,10.71 0 0 1 7.7,-8.68c0.26,-0.07 0.52,-0.14 0.78,-0.19l0.11,0l0.35,-0.07a10.78,10.78 0 0 1 1.63,-0.12l0.19,0a11.83,11.83 0 0 1 1.2,0.1a10.66,10.66 0 0 1 8.16,5.93c0.06,0.11 0.12,0.23 0.18,0.37l0.14,0.34c0.13,0.34 0.21,0.6 0.24,0.68s0,0 0,0a10.15,10.15 0 0 1 0.38,1.63a0.43,0.43 0 0 1 0,0.11a11.4,11.4 0 0 1 0.11,1.47a11.27,11.27 0 0 1 -0.13,1.66a10.72,10.72 0 0 1 -7.71,8.68l0,0c-0.26,0.07 -0.51,0.13 -0.77,0.18l-0.11,0l-0.35,0.07a11,11 0 0 1 -1.64,0.12"
        fill={secondary}
      />
      <path
        d="m7.51,87.53a1.47,1.47 0 0 1 -1.51,-1.47l0,-4.4c0,-3.79 3,-14.61 16,-14.61a15.89,15.89 0 0 1 9.89,3a1.47,1.47 0 0 1 -1.78,2.34a13.06,13.06 0 0 0 -8.11,-2.39c-12.66,0 -13,11.55 -13,11.66l0,4.4a1.47,1.47 0 0 1 -1.47,1.47"
        fill={secondary}
      />
      <path
        d="m19.73,61.34l0.55,0.13l0.17,0l0.18,0a7.62,7.62 0 0 0 1.18,0.09l0.19,0a6.36,6.36 0 0 0 0.86,-0.07a7.77,7.77 0 0 0 5.88,-4.26l0.06,-0.12l0.08,-0.17l0.09,-0.22l0,-0.09c0.09,-0.24 0.17,-0.47 0.17,-0.48l0,0a7.1,7.1 0 0 0 0.27,-1.15a9.38,9.38 0 0 0 0.08,-1.14s0,-0.09 0,-0.1a9.34,9.34 0 0 0 -0.1,-1.1a7.76,7.76 0 0 0 -5.58,-6.3l-0.55,-0.13l-0.18,0l-0.17,0a7.66,7.66 0 0 0 -1.19,-0.09l-0.14,0a8.6,8.6 0 0 0 -0.86,0.08a7.69,7.69 0 0 0 -5.88,4.26l-0.06,0.11l-0.08,0.17c0,0.09 -0.06,0.16 -0.1,0.24l-0.19,0.56l0,0a8,8 0 0 0 -0.27,1.15a9.49,9.49 0 0 0 -0.09,1.14l0,0.15a7.48,7.48 0 0 0 0.1,1.09a7.74,7.74 0 0 0 5.58,6.3m2.1,3.23a11,11 0 0 1 -1.65,-0.12l-0.35,-0.07l-0.12,0l-0.71,-0.25l0,0a10.7,10.7 0 0 1 -7.71,-8.68a10.83,10.83 0 0 1 -0.13,-1.57l0,-0.13a9.72,9.72 0 0 1 0.12,-1.48a10.59,10.59 0 0 1 0.37,-1.66l0,0s0,0 0,0l0.21,-0.58c0.07,-0.21 0.12,-0.33 0.17,-0.45l0.18,-0.36a10.67,10.67 0 0 1 8.14,-5.92c0.48,-0.06 0.85,-0.09 1.21,-0.1l0.17,0a11,11 0 0 1 1.66,0.12l0.35,0.07l0.12,0a7.57,7.57 0 0 1 0.76,0.18a10.71,10.71 0 0 1 7.71,8.68a10.59,10.59 0 0 1 0.13,1.56l0,0.14a9.82,9.82 0 0 1 -0.12,1.48a10.47,10.47 0 0 1 -0.38,1.65s0,0 0,0.06l0,0c0,0.1 -0.11,0.33 -0.21,0.59a1,1 0 0 0 0,0.1c0,0.11 -0.09,0.23 -0.14,0.34a3.17,3.17 0 0 1 -0.17,0.37a10.67,10.67 0 0 1 -8.15,5.91a8,8 0 0 1 -1.2,0.1l-0.18,0l-0.08,0.02z"
        fill={secondary}
      />
    </>
  );
};

const LeadershipWorldwideIcon = ({ primary, secondary }: IconProps) => {
  return (
    <>
      <path
        fill={primary}
        d="m76.38,52a22.18,22.18 0 1 1 -22.18,-22.16a22.18,22.18 0 0 1 22.18,22.16"
      />
      <path
        fill={secondary}
        d="m49.27,25a23.73,23.73 0 1 0 23.73,23.74a23.72,23.72 0 0 0 -23.73,-23.74m0,3a20.69,20.69 0 1 1 -20.69,20.74a20.71,20.71 0 0 1 20.69,-20.69"
      />
      <path
        fill={secondary}
        d="m49.31,79.46a30.72,30.72 0 0 1 -12.31,-58.9l1.21,2.79a27.69,27.69 0 1 0 22.1,50.78l1.21,2.79a30.7,30.7 0 0 1 -12.21,2.54"
      />
      <path
        fill={secondary}
        d="m62.44,80.55a1.53,1.53 0 0 1 -1.4,-0.92l-2.45,-5.63a1.52,1.52 0 1 1 2.79,-1.21l2.45,5.64a1.52,1.52 0 0 1 -0.79,2a1.41,1.41 0 0 1 -0.6,0.13"
      />
      <path
        fill={secondary}
        d="m38.55,25.61a1.52,1.52 0 0 1 -1.39,-0.91l-2.45,-5.64a1.52,1.52 0 1 1 2.78,-1.21l2.51,5.63a1.52,1.52 0 0 1 -0.79,2a1.49,1.49 0 0 1 -0.61,0.13"
      />
      <path
        fill={secondary}
        d="m49.27,88.06a1.52,1.52 0 0 1 -1.52,-1.52l0,-8.54a1.52,1.52 0 1 1 3,0l0,8.59a1.52,1.52 0 0 1 -1.52,1.52"
      />
      <path fill={secondary} d="m57.74,92.93l-17,0a1.52,1.52 0 1 1 0,-3l17,0a1.52,1.52 0 0 1 0,3" />
    </>
  );
};

const CategoryIcon = {
  christian_character: ChristianCharacterIcon,
  intellectual_maturity: IntellectualMaturityIcon,
  lives_of_service: LivesOfServiceIcon,
  leadership_worldwide: LeadershipWorldwideIcon,
};

export default VictoryPromiseIcon;
