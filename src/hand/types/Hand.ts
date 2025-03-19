import { Meld } from './index';

type Conditions = {
  isTsumo: boolean;
  isRiichi: boolean;
  isDoubleRiichi: boolean;
  isIppatsu: boolean;
  isHaitei: boolean; //For haitei/houtei
  isRinshan: boolean; //Win from dead wall
  isChankan: boolean; //Robbing a kan
};

export default interface Hand {
  melds: Meld[];
  conditions?: Conditions;
}
