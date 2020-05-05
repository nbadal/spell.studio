import React, { Component } from "react";
import { SpellClass } from "../store/spells/types";
import { ReactComponent as BardIcon } from "../svg/classes/bard.svg";
import { ReactComponent as ClericIcon } from "../svg/classes/cleric.svg";
import { ReactComponent as DruidIcon } from "../svg/classes/druid.svg";
import { ReactComponent as PaladinIcon } from "../svg/classes/paladin.svg";
import { ReactComponent as RangerIcon } from "../svg/classes/ranger.svg";
import { ReactComponent as SorcererIcon } from "../svg/classes/sorcerer.svg";
import { ReactComponent as WarlockIcon } from "../svg/classes/warlock.svg";
import { ReactComponent as WizardIcon } from "../svg/classes/wizard.svg";
import { CardColor } from "../store/colors/types";

interface Props {
    spellClass: SpellClass;
    color: CardColor;
}

export class ClassIcon extends Component<Props> {
    public render() {
        let props: React.SVGProps<SVGSVGElement> = {
            height: "1.5in",
            fill: this.props.color,
        };

        switch (this.props.spellClass) {
            case "bard":
                return <BardIcon {...props} />;
            case "cleric":
                return <ClericIcon {...props} />;
            case "druid":
                return <DruidIcon {...props} />;
            case "paladin":
                return <PaladinIcon {...props} />;
            case "ranger":
                return <RangerIcon {...props} />;
            case "sorcerer":
                return <SorcererIcon {...props} />;
            case "warlock":
                return <WarlockIcon {...props} />;
            case "wizard":
                return <WizardIcon {...props} />;
            default:
                return <svg />;
        }
    }
}
