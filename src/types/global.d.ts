interface UserInfo {
  firstName: string;
  lastName: string;
  bodySize: string;
  bodyWeight: string;
  email: string;
  password: string;
}

interface StepList {
  id: string;
  title: string;
}

interface ProfileInfo {
  goal: string;
  calories: string;
  type: string;
  allergies: string[];
  incompatibilities: string[];
  additional: string[];
}

interface Navigation {
  name: string;
  href: string;
  icon: JSX.Element;
  current: boolean;
}

interface UserType {
  id: string;
  address: string;
  age: number;
  dose1: string;
  dose1_date: string;
  dose2: string;
  dose2_date: string;
  email: string;
  ethnity: string;
  gender: string;
  isFirstTimeLogin: boolean;
  isVerified: boolean;
  last_checkin: string;
  last_checkin_address: string;
  name: string;
  passportNo: string;
  phoneNumber: string;
  postcode: string;
  state: string;
}

interface VaccineType {
  name: string;
  batch: string;
  manufacturer: string;
  facility: string;
}

interface NewsType {
  date: string;
  title: string;
  timestamp: number;
}

interface UpdateStatistics {
  activeCase: string;
  activeCaseTrend: string;
  confirmCase: string;
  rValue: string;
  recovered: string;
  todayActiveCases: string;
  todayConfirmCases: string;
  todayDeath: string;
  todayRecovered: string;
  weeklyStatistics: string;
  weeklyTrend: string;
  date: string;
  death: string;
}

interface GlobalStatistics {
  activeCases: string;
  aseanStatistics: string;
  confirmedCases: string;
  date: string;
  death: string;
  recoveredCases: string;
  todayActiveCases: string;
  todayConfirmedCases: string;
  todayDeath: string;
  todayRecoveredCases: string;
  topCountries: string;
}
