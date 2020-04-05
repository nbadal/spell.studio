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
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {ColorMode} from "../store/colors/types";
import {changeColorMode} from "../store/colors/actions";

const mapStateToProps = (state: RootState) => ({
    filter: state.spells.filter,
    spellCount: state.spells.filtered.length,
    colors: state.colors,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateFilter: (filter: SpellFilter) => dispatch(filterSpells(filter)),
        changeColorMode: (mode: ColorMode) => dispatch(changeColorMode(mode)),
    }
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) => createStyles({
    controlGroup: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        marginBottom: "4em",
    },
    selectControl: {
        minWidth: "100px",
        margin: theme.spacing(0, 1),
    },
    capitalized: {
        textTransform: "capitalize",
    },
});
type StyleProps = WithStyles<typeof styles>;
let stylesConnector = withStyles(styles);

class Controls extends Component<ReduxProps & StyleProps> {
    public render() {
        const {classes} = this.props;

        return (
            <Box className="Controls" displayPrint="none">
                <Typography>Filter</Typography>
                <Box className={classes.controlGroup}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel>Class</InputLabel>
                        <Select multiple
                                className="Select"
                                value={this.props.filter.classes}
                                input={<Input/>}
                                renderValue={(selected) =>
                                    <Box className={classes.capitalized}>{(selected as string[]).join(', ')}</Box>
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
                    <FormControl className={classes.selectControl}>
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
                    <FormControl className={classes.selectControl}>
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
                </Box>
                <Typography>Colors</Typography>
                <Box className={classes.controlGroup}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel>Color By</InputLabel>
                        <Select
                            value={this.props.colors.colorMode}
                            onChange={(event) => {
                                let value = event.target.value as ColorMode;
                                this.props.changeColorMode(value);
                            }}>
                            <MenuItem value={ColorMode.BY_CLASS}>Class</MenuItem>
                            <MenuItem value={ColorMode.BY_SCHOOL}>School</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    private updateFilter(newData: any) {
        let newFilter = Object.assign({}, this.props.filter);
        Object.assign(newFilter, newData);
        this.props.updateFilter(newFilter);
    }
}

export default stylesConnector(reduxConnector(Controls));
