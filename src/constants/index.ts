import {
  ClockIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  StatusOnlineIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

export const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UserGroupIcon },
  { name: 'Vaccines', href: '/vaccines', icon: ClockIcon },
  { name: 'News', href: '/news', icon: ScaleIcon },
  { name: 'Statistics', href: '/statistics', icon: StatusOnlineIcon },
];

export const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

export const states = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Perak',
  'Perlis',
  'Pulau Pinang',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'WP Kuala Lumpur',
  'WP Labuan',
  'WP Putrajaya',
];
