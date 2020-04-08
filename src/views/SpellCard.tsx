import React, {Component, ReactNode} from 'react';
import {Spell} from "../store/spells/types";
import "../css/SpellCard.css"
import {ConcentrationIcon} from "./ConcentrationIcon";
import Textfit from "react-textfit";
import Box from "@material-ui/core/Box";
import {RootState} from "../store/store";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {selectSpell, unselectSpell} from "../store/spells/actions";
import {selectSpellColor} from "../store/colors/selectors";

const mapStateToProps = (state: RootState, props: Props) => ({
    selectionActive: state.spells.selected.length > 0,
    selected: state.spells.selected.includes(props.spell),
    cardColor: selectSpellColor(state, props),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectSpell: (spell: Spell) => dispatch(selectSpell(spell)),
        unselectSpell: (spell: Spell) => dispatch(unselectSpell(spell)),
    }
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props {
    spell: Spell;
}

class SpellCard extends Component<Props & ReduxProps> {
    public render() {
        return (
            <div className={!this.props.selectionActive || this.props.selected ? "SpellCard" : "DisabledSpellCard"}
                 style={{backgroundColor: this.props.cardColor}}
                 onClick={this.onClick}>
                <div className="Name">
                    <Box>
                        <Textfit mode="single" max={14}>
                            {this.props.spell.name}
                        </Textfit>
                    </Box>
                </div>
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
                                fontSize: 18,
                                color: this.props.cardColor,
                            }}/>
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
        if (this.props.spell.ritual) {
            spellType += " (ritual)"
        }

        // Capitalize first letter.
        spellType = spellType.substring(0, 1).toUpperCase() + spellType.substring(1);

        return spellType;
    }

    private spellComponentsString(): string {
        let components: string[] = [];
        if (this.props.spell.components.verbal) components.push("V");
        if (this.props.spell.components.somatic) components.push("S");
        if (this.props.spell.components.material) components.push("M");
        return components.join(", ");
    }

    private onClick = () => {
        if (this.props.selected) {
            this.props.unselectSpell(this.props.spell);
        } else {
            this.props.selectSpell(this.props.spell);
        }
    }
}

export default reduxConnector(SpellCard);

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
