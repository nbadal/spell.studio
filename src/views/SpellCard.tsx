import React, {Component, ReactNode} from 'react';
import {Spell} from "../store/spells/types";
import "../css/SpellCard.css"

interface Props {
    spell: Spell;
}

export default class SpellCard extends Component<Props> {
    public render() {
        return (
            <div className="SpellCard">
                <div className="Name">{this.props.spell.name}</div>
                <div className="Type">{this.spellTypeString()}</div>
                <table className="StatsTable">
                    <tr>
                        <td>
                            <div className="StatsTitle">Casting Time</div>
                            <div className="StatsValue">{this.props.spell.castingTime}</div>
                        </td>
                        <td>
                            <div className="StatsTitle">Range</div>
                            <div className="StatsValue">{this.props.spell.range}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="StatsTitle">Components</div>
                            <div className="StatsValue">{this.spellComponentsString()}</div>
                        </td>
                        <td>
                            <div className="StatsTitle">Duration</div>
                            <div className="StatsValue">{this.props.spell.duration}</div>
                        </td>
                    </tr>
                </table>
                <div className="DetailsContainer">
                    {this.props.spell.components.materialInfo !== undefined &&
                    <div className="DetailsBlock">Material: {this.props.spell.components.materialInfo}</div>
                    }
                    {this.props.spell.details
                        .filter(detail => typeof detail === "string")
                        .map((detail, i, arr) => (
                            <div className="DetailsBlock" style={{flexGrow: i === arr.length - 1 ? 1 : 0}}>{this.processText(detail)}</div>
                        ))}
                    {this.props.spell.higherLevels && (
                            <div className="HigherLevels">At Higher Levels</div>
                    )}
                    {this.props.spell.higherLevels && (
                            <div className="DetailsBlock">{this.processText(this.props.spell.higherLevels)}</div>
                    )}
                </div>
                <div className="CardFooter">
                    <div></div>
                    <div>Spell Studio</div>
                </div>
            </div>
        );
    }

    private spellTypeString(): string {
        let spellType: string = "";

        switch (this.props.spell.level) {
            case 1:
                spellType += "1st-level ";
                break;
            case 2:
                spellType += "2nd-level ";
                break;
            case 3:
                spellType += "3rd-level ";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                spellType += this.props.spell.level + "th-level ";
                break;
        }

        spellType += this.props.spell.school;

        if (this.props.spell.level === 0) {
            spellType += " cantrip"
        }

        // Capitalize first letter.
        return spellType.substring(0, 1).toUpperCase() + spellType.substring(1);
    }

    private spellComponentsString(): string {
        let components: string[] = [];
        if (this.props.spell.components.verbal) components.push("V");
        if (this.props.spell.components.somatic) components.push("S");
        if (this.props.spell.components.material) components.push("M");
        return components.join(", ");
    }

    private processText(text: string): ReactNode {
        return text.split("***")
            .map((value, index) => {
                if (index % 2) {
                    // Odd indexes are within **'s
                    return (<span className="BoldDetail">{value}</span>);
                } else {
                    return value;
                }
            });
    }


}
