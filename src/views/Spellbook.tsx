import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";

import SpellCard from "./SpellCard";
import {Spell, SpellClass} from "../store/spells/types";
import {RootState} from "../store/store";
import {Color} from "csstype";
import {Dispatch} from "redux";
import {clearSelection, selectSpell, unselectSpell} from "../store/spells/actions";
import {Button, Snackbar} from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
    spells: state.spells.filtered,
    selected: state.spells.selected,
    filter: state.spells.filter,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectSpell: (spell: Spell) => dispatch(selectSpell(spell)),
        unselectSpell: (spell: Spell) => dispatch(unselectSpell(spell)),
        clearSelection: () => dispatch(clearSelection()),
    }
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

class Spellbook extends Component<ReduxProps> {
    public render() {
        return (
            <div className="Spellbook">
                <div>
                    {this.props.spells.map((spell: Spell) => (
                        <SpellCard key={spell.name} spell={spell}
                                   selected={this.isSpellSelected(spell)}
                                   cardColor={this.cardColor(spell)}
                                   onClick={() => this.spellClicked(spell)}/>
                    ))}
                </div>
                <Snackbar
                    open={this.props.selected.length > 0}
                    anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                    message={"Selected: " + this.props.selected.length + " / " + this.props.spells.length}
                    action={<Button color="secondary" size="small" onClick={this.clearSelection}>CLEAR</Button>}
                />
            </div>
        );
    }

    private spellClicked = (spell: Spell) => {
        if (this.props.selected.includes(spell)) {
            this.props.unselectSpell(spell);
        } else {
            this.props.selectSpell(spell);
        }
    };

    private isSpellSelected = (spell: Spell) => {
        return this.props.selected.length === 0 || this.props.selected.includes(spell);
    };

    private clearSelection = () => {
        this.props.clearSelection();
    };

    private cardColor(spell: Spell): Color {
        let spellClasses = this.spellClasses(spell);
        if (spellClasses.length === 0) {
            console.error("Couldn't figure out a color for " + spell.name);
            return "gray";
        }
        // TODO: how should we handle multi-class spells?
        // Right now, just select the first class listed.
        return this.classColor(spellClasses[0]);
    }

    private classColor(spellClass: SpellClass): Color {
        // From D&D Beyond:
        switch (spellClass) {
            case "bard":
                return "#AB6DAC";
            case "cleric":
                return "#91A1B2";
            case "druid":
                return "#7A853B";
            case "paladin":
                return "#B59E54";
            case "ranger":
                return "#507F62";
            case "sorcerer":
                return "#992E2E";
            case "warlock":
                return "#7B469B";
            case "wizard":
                return "#2A50A1";
        }
    }

    private spellClasses(spell: Spell): SpellClass[] {
        if (this.props.filter.classes.length > 0) {
            return spell.classes.filter(c => this.props.filter.classes.includes(c));
        } else {
            return spell.classes;
        }
    }
}

export default reduxConnector(Spellbook);
