import React, {Component} from 'react';
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import _ from "lodash";
import {RootState} from "../store/store";
import {filterSpells} from "../store/spells/actions";
import {AllSpellClasses, SpellClass, SpellFilter} from "../store/spells/types";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";

const mapStateToProps = (state: RootState) => ({
    filter: state.spells.filter,
    spellCount: state.spells.filtered.length
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateFilter: (filter: SpellFilter) => dispatch(filterSpells(filter)),
    }
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) => createStyles({
    title: {
        flexGrow: 1,
        fontFamily: "modesto-text",
        fontStyle: "normal",
        fontSize: "xx-large",
        textAlign: "left",
        margin: 0,
    },
    filter: {
        minWidth: "100px",
        margin: theme.spacing(0, 1),
    },
    capitalized: {
        textTransform: "capitalize",
    }
});
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class Controls extends Component<ReduxProps & StyleProps> {
    public render() {
        const {classes} = this.props;

        return (
            <div className="Controls">
                <div className={classes.title}>SpellStudio</div>
                <div className="filters">
                    <FormControl className={classes.filter}>
                        <InputLabel>Class</InputLabel>
                        <Select multiple
                                className="Select"
                                value={this.props.filter.classes}
                                input={<Input/>}
                                renderValue={(selected) =>
                                    <div className={classes.capitalized}>{(selected as string[]).join(', ')}</div>
                                }
                                onChange={(event) => {
                                    let classes = Array.from(event.target.value as SpellClass[])
                                    this.updateFilter({classes});
                                }}>
                            {AllSpellClasses.map(klass => (
                                <MenuItem className={classes.capitalized} key={klass} value={klass}>
                                    <Checkbox checked={this.props.filter.classes.includes(klass)}/>
                                    <ListItemText primary={klass}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.filter}>
                        <InputLabel>Min Level</InputLabel>
                        <Select
                            className="Select"
                            value={this.props.filter.levelMin}
                            onChange={(event) => {
                                let value = event.target.value as string;
                                let levelMin = Number.parseInt(value);
                                this.updateFilter({levelMin})
                            }}>
                            {_.range(0, this.props.filter.levelMax + 1)
                                .map(n => (
                                    <MenuItem className={classes.capitalized} key={n} value={n}>
                                        {n || "Cantrip"}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.filter}>
                        <InputLabel>Max Level</InputLabel>
                        <Select
                            className="Select"
                            value={this.props.filter.levelMax}
                            onChange={(event) => {
                                let value = event.target.value as string;
                                let levelMax = Number.parseInt(value);
                                this.updateFilter({levelMax})
                            }}>
                            {_.range(this.props.filter.levelMin, 10)
                                .map(n => (
                                    <MenuItem className={classes.capitalized} key={n} value={n}>
                                        {n || "Cantrip"}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }

    private updateFilter(newData: any) {
        let newFilter = Object.assign({}, this.props.filter);
        Object.assign(newFilter, newData);
        this.props.updateFilter(newFilter);
    }
}

export default stylesConnector(reduxConnector(Controls));
