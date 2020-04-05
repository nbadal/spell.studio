import React, {Component, MouseEventHandler, ReactNode} from 'react';
import {Spell} from "../store/spells/types";
import "../css/SpellCard.css"
import {Color} from "csstype";
import {ConcentrationIcon} from "./ConcentrationIcon";

interface Props {
    spell: Spell;
    cardColor: Color;
    selected: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export default class SpellCard extends Component<Props> {
    public render() {
        return (
            <div className={this.props.selected ? "SpellCard" : "DisabledSpellCard"}
                 style={{backgroundColor: this.props.cardColor}}
                 onClick={this.props.onClick}>
                <div className="Name">{this.props.spell.name}</div>
                <div className="Type">{this.spellTypeString()}</div>
                <table className="StatsTable">
                    <tbody>
                    <tr>
                        {this.statCell("Casting Time", this.props.spell.castingTime)}
                        {this.statCell("Range", this.props.spell.range)}
                    </tr>
                    <tr>
                        {this.statCell("Components", this.spellComponentsString())}
                        {this.statCell("Duration", this.props.spell.duration, !this.props.spell.concentration || (
                            <ConcentrationIcon style={{
                                fontSize: 16,
                                color: this.props.cardColor,
                            }} />
                        ))}
                    </tr>
                    </tbody>
                </table>
                <div className="DetailsContainer">
                    {this.props.spell.components.materialInfo !== undefined &&
                    <div className="DetailsBlock">Material: {this.props.spell.components.materialInfo}</div>
                    }
                    {this.props.spell.details
                        .filter(detail => typeof detail === "string")
                        .map((detail, i, arr) => (
                            <div className="DetailsBlock" key={i}
                                 style={{flexGrow: i === arr.length - 1 ? 1 : 0}}>{processText(detail)}</div>
                        ))}
                    {this.props.spell.higherLevels && (
                        <div className="HigherLevels">At Higher Levels</div>
                    )}
                    {this.props.spell.higherLevels && (
                        <div className="DetailsBlock">{processText(this.props.spell.higherLevels)}</div>
                    )}
                </div>
                <div className="CardFooter">
                    <div/>
                    <div>SpellStudio°</div>
                </div>
            </div>
        );
    }

    private statCell = (title: string, value: string, badge?: ReactNode) => (
        <td>
            <div className="CellContent">
                <div className="StatsTitle" style={{color: this.props.cardColor}}>{title}</div>
                <div className="StatsValue">{value}</div>
                {badge && <div className="StatsBadge">{badge}</div>}
            </div>
        </td>
    );

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
}


function processText(text: string): ReactNode {
    return text.split("***")
        .map((value, index) => {
            if (index % 2) {
                // Odd indexes are within **'s
                return (<span key={index} className="BoldDetail">{value}</span>);
            } else {
                return value;
            }
        });
}
