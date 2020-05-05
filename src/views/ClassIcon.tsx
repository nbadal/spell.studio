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

interface Props extends React.SVGProps<SVGSVGElement> {
    spellClass: SpellClass;
}

export class ClassIcon extends Component<Props> {
    public render() {
        switch (this.props.spellClass) {
            case "bard":
                return <BardIcon {...this.props} />;
            case "cleric":
                return <ClericIcon {...this.props} />;
            case "druid":
                return <DruidIcon {...this.props} />;
            case "paladin":
                return <PaladinIcon {...this.props} />;
            case "ranger":
                return <RangerIcon {...this.props} />;
            case "sorcerer":
                return <SorcererIcon {...this.props} />;
            case "warlock":
                return <WarlockIcon {...this.props} />;
            case "wizard":
                return <WizardIcon {...this.props} />;
        }
    }
}
