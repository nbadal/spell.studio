import React from 'react';
import Box from '@mui/material/Box';
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
    icon: CardIcon | undefined;
    iconCharacter: string | undefined;
    height: string;
    fill: string;
}

export function CardIconView(props: Props) {
    const {
        height, fill, icon, iconCharacter,
    } = props;

    if (icon) {
        switch (icon) {
            case 'bard':
                return <BardIcon height={height} fill={fill} />;
            case 'cleric':
                return <ClericIcon height={height} fill={fill} />;
            case 'druid':
                return <DruidIcon height={height} fill={fill} />;
            case 'paladin':
                return <PaladinIcon height={height} fill={fill} />;
            case 'ranger':
                return <RangerIcon height={height} fill={fill} />;
            case 'sorcerer':
                return <SorcererIcon height={height} fill={fill} />;
            case 'warlock':
                return <WarlockIcon height={height} fill={fill} />;
            case 'wizard':
                return <WizardIcon height={height} fill={fill} />;
            default:
                throw Error('Unknown icon for card');
        }
    } else if (iconCharacter) {
        return <Box sx={{ fontSize: height }}>{iconCharacter}</Box>;
    } else {
        throw Error('Missing icon for card');
    }
}
