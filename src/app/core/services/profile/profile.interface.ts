import { FetchProfile } from '../../api/profile';

export interface Profile extends FetchProfile {
  name: string;
}