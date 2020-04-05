import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import SpellCard from "./SpellCard";
import {Spell, SpellClass} from "../store/spells/types";
import {RootState} from "../store/store";
import {Color} from "csstype";
import {Dispatch} from "redux";
import {clearSelection, selectSpell, unselectSpell} from "../store/spells/actions";
import PrintIcon from '@material-ui/icons/Print';
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import {ColorMode} from "../store/colors/types";

const mapStateToProps = (state: RootState) => ({
    spells: state.spells.filtered,
    selected: state.spells.selected,
    filter: state.spells.filter,
    colors: state.colors,
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

const styles = (theme: Theme) => createStyles({
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
});
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class Spellbook extends Component<ReduxProps & StyleProps> {
    public render() {
        const {classes} = this.props;
        return (
            <Box className="Spellbook">
                <Box>
                    {this.props.spells.map((spell: Spell) => (
                        <SpellCard key={spell.name} spell={spell}
                                   selected={this.isSpellSelected(spell)}
                                   cardColor={this.cardColor(spell)}
                                   onClick={() => this.spellClicked(spell)}/>
                    ))}
                </Box>
                <Box displayPrint="none">
                    <Snackbar
                        open={this.props.selected.length > 0}
                        anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                        message={"Selected: " + this.props.selected.length + " / " + this.props.spells.length}
                        action={<Button color="secondary" size="small" onClick={this.clearSelection}>CLEAR</Button>}
                    />
                    <Fab className={classes.fab} onClick={this.handlePrint}>
                        <PrintIcon color={"primary"}/>
                    </Fab>
                </Box>
            </Box>
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

    private handlePrint = () => {
        window.print();
    };

    private cardColor = (spell: Spell): Color => {
        switch (this.props.colors.colorMode) {
            case ColorMode.BY_SCHOOL:
                return this.props.colors.bySchool[spell.school];
            case ColorMode.BY_CLASS:
                let spellClasses = this.spellClasses(spell);
                if (spellClasses.length === 0) {
                    console.error("Couldn't figure out a color for " + spell.name);
                    return "gray";
                }
                // TODO: how should we handle multi-class spells?
                // Right now, just select the first class listed.
                return this.props.colors.byClass[spellClasses[0]];
        }
    };

    private spellClasses(spell: Spell): SpellClass[] {
        if (this.props.filter.classes.length > 0) {
            return spell.classes.filter(c => this.props.filter.classes.includes(c));
        } else {
            return spell.classes;
        }
    }
}

export default stylesConnector(reduxConnector(Spellbook));
