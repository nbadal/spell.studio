import React from 'react';
import { CardIcon } from '../store/cards/types';
import { ReactComponent as BardIcon } from '../svg/classes/bard.svg';
import { ReactComponent as ClericIcon } from '../svg/classes/cleric.svg';
import { ReactComponent as DruidIcon } from '../svg/classes/druid.svg';
import { ReactComponent as PaladinIcon } from '../svg/classes/paladin.svg';
import { ReactComponent as RangerIcon } from '../svg/classes/ranger.svg';
import { ReactComponent as SorcererIcon } from '../svg/classes/sorcerer.svg';
import { ReactComponent as WarlockIcon } from '../svg/classes/warlock.svg';
import { ReactComponent as WizardIcon } from '../svg/classes/wizard.svg';

interface Props {
    icon: CardIcon;
    className: string;
    height: string;
    fill: string;
}

export function CardIconView(props: Props) {
    const {
        className, height, fill, icon,
    } = props;

    switch (icon) {
        case 'bard':
            return <BardIcon className={className} height={height} fill={fill} />;
        case 'cleric':
            return <ClericIcon className={className} height={height} fill={fill} />;
        case 'druid':
            return <DruidIcon className={className} height={height} fill={fill} />;
        case 'paladin':
            return <PaladinIcon className={className} height={height} fill={fill} />;
        case 'ranger':
            return <RangerIcon className={className} height={height} fill={fill} />;
        case 'sorcerer':
            return <SorcererIcon className={className} height={height} fill={fill} />;
        case 'warlock':
            return <WarlockIcon className={className} height={height} fill={fill} />;
        case 'wizard':
            return <WizardIcon className={className} height={height} fill={fill} />;
        default:
            throw Error('Missing icon for card');
    }
}
