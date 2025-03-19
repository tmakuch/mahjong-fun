import { Meld } from './index';

type Conditions = {
  /*To*/ isTsumo: boolean;
  /*Ri*/ isRiichi: boolean;
  /*DR*/ isDoubleRiichi: boolean;
  /*Iu*/ isIppatsu: boolean;
  /*Hi*/ isHaitei: boolean; //For haitei/houtei
  /*Rn*/ isRinshan: boolean; //win from dead wall
  /*Cn*/ isChankan: boolean; //Robbing a kan
};

export default interface Hand {
  melds: Meld[];
  conditions: Conditions;
}
