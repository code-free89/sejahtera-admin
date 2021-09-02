import {
  ClockIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

export const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UserGroupIcon },
  { name: 'Vaccines', href: '/vaccines', icon: ClockIcon },
  { name: 'News', href: '/news', icon: ScaleIcon },
];

export const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];
