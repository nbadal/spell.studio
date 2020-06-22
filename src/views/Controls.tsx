import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import _ from 'lodash';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import {
    createStyles, Theme, withStyles, WithStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { SketchPicker } from 'react-color';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import {
    changeClassColor, changeColorMode, changeSchoolColor, setDefaultColors,
} from '../store/colors';
import { selectCardCount } from '../store/cards/selectors';
import { CardColor, ColorMode } from '../store/colors/types';
import {
    AllSpellClasses,
    AllSpellSchools,
    SpellClass,
    SpellFilter,
    SpellSchool,
} from '../store/spells/types';
import { RootState } from '../store/store';
import { setFrontShown, setBackShown, resetLayout } from '../store/layout';
import { filterSpells, resetSpellFilter } from '../store/spells';

const mapStateToProps = (state: RootState) => ({
    filter: state.spells.filter,
    spellCount: selectCardCount(state),
    colors: state.colors,
    showFront: state.layout.showFront,
    showBack: state.layout.showBack,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateFilter: (filter: SpellFilter) => dispatch(filterSpells(filter)),
    setFrontShown: (show: boolean) => dispatch(setFrontShown(show)),
    setBackShown: (show: boolean) => dispatch(setBackShown(show)),
    changeColorMode: (mode: ColorMode) => dispatch(changeColorMode(mode)),
    changeClassColor: (spellClass: SpellClass, color: CardColor) =>
        dispatch(changeClassColor({ color, spellClass })),
    changeSchoolColor: (spellSchool: SpellSchool, color: CardColor) =>
        dispatch(changeSchoolColor({ color, spellSchool })),
    resetFilter: () => dispatch(resetSpellFilter()),
    resetLayout: () => dispatch(resetLayout()),
    resetColors: () => dispatch(setDefaultColors()),
});

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

const styles = (theme: Theme) =>
    createStyles({
        controlGroup: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            marginBottom: '4em',
        },
        selectControl: {
            minWidth: '100px',
            margin: theme.spacing(1),
        },
        colorGrid: {
            display: 'grid',
            gridTemplateColumns: '24px 1fr',
            gridRowGap: theme.spacing(1),
            margin: theme.spacing(1),
            justifyItems: 'center',
            alignItems: 'center',
        },
        color: {
            width: 12,
            height: '100%',
        },
        picker: {
            position: 'absolute',
            zIndex: 2,
        },
        overlayClose: {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        capitalized: {
            textTransform: 'capitalize',
        },
    });
type StyleProps = WithStyles<typeof styles>;
const stylesConnector = withStyles(styles);

interface State {
    showClassColorPicker?: SpellClass;
    showSchoolColorPicker?: SpellSchool;
}

class Controls extends Component<ReduxProps & StyleProps, State> {
    constructor(props: Readonly<ReduxProps & StyleProps>) {
        super(props);

        this.state = {};
    }

    private ColorPicker = (
        color: string,
        label: string,
        showPicker: boolean,
        clickHandler: () => void,
        colorHandler: (newColor: string) => void,
    ) => {
        const { classes } = this.props;
        return (
            <React.Fragment key={label}>
                <Box className={classes.color} style={{ backgroundColor: color }} />
                <Box onClick={clickHandler}>
                    <TextField
                        label={label}
                        value={color.toUpperCase()}
                        size="small"
                        variant="outlined"
                        disabled
                    />
                    {showPicker && (
                        <Box className={classes.picker}>
                            <Box className={classes.overlayClose} onClick={clickHandler} />
                            <SketchPicker
                                disableAlpha
                                color={color}
                                onChange={(newColor) => colorHandler(newColor.hex)}
                            />
                        </Box>
                    )}
                </Box>
            </React.Fragment>
        );
    };

    private classColorClicked = (spellClass: SpellClass) => {
        if (spellClass === this.state.showClassColorPicker) {
            this.setState({ showSchoolColorPicker: undefined, showClassColorPicker: undefined });
        } else {
            this.setState({ showSchoolColorPicker: undefined, showClassColorPicker: spellClass });
        }
    };

    private schoolColorClicked = (spellSchool: SpellSchool) => {
        if (spellSchool === this.state.showSchoolColorPicker) {
            this.setState({ showSchoolColorPicker: undefined, showClassColorPicker: undefined });
        } else {
            this.setState({ showSchoolColorPicker: spellSchool, showClassColorPicker: undefined });
        }
    };

    private classColorPicked = (spellClass: SpellClass, color: string) => {
        this.props.changeClassColor(spellClass, color);
    };

    private schoolColorPicked = (spellSchool: SpellSchool, color: string) => {
        this.props.changeSchoolColor(spellSchool, color);
    };

    private resetClicked = () => {
        this.props.resetFilter();
        this.props.resetLayout();
        this.props.resetColors();
    }

    private updateFilter(newData: Partial<SpellFilter>) {
        const newFilter = { ...this.props.filter };
        Object.assign(newFilter, newData);
        this.props.updateFilter(newFilter);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Box className="Controls" displayPrint="none">
                <Typography>Filter</Typography>
                <Box className={classes.controlGroup}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel>Class</InputLabel>
                        <Select
                            multiple
                            className="Select"
                            value={this.props.filter.classes}
                            input={<Input />}
                            renderValue={(selected) => (
                                <Box className={classes.capitalized}>
                                    {(selected as string[]).join(', ')}
                                </Box>
                            )}
                            onChange={(event) => {
                                const spellClasses = Array.from(event.target.value as SpellClass[]);
                                this.updateFilter({ classes: spellClasses });
                            }}
                        >
                            {AllSpellClasses.map((klass) => (
                                <MenuItem className={classes.capitalized} key={klass} value={klass}>
                                    <Checkbox checked={this.props.filter.classes.includes(klass)} />
                                    <ListItemText primary={klass} />
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
                                const value = event.target.value as string;
                                const levelMin = Number.parseInt(value, 10);
                                this.updateFilter({ levelMin });
                            }}
                        >
                            {_.range(0, this.props.filter.levelMax + 1).map((n) => (
                                <MenuItem className={classes.capitalized} key={n} value={n}>
                                    {n || 'Cantrip'}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.selectControl}>
                        <InputLabel>Max Level</InputLabel>
                        <Select
                            className="Select"
                            value={this.props.filter.levelMax}
                            onChange={(event) => {
                                const value = event.target.value as string;
                                const levelMax = Number.parseInt(value, 10);
                                this.updateFilter({ levelMax });
                            }}
                        >
                            {_.range(this.props.filter.levelMin, 10).map((n) => (
                                <MenuItem className={classes.capitalized} key={n} value={n}>
                                    {n || 'Cantrip'}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Typography>Layout</Typography>
                <Box className={classes.controlGroup}>
                    <FormControl>
                        <FormGroup row>
                            <FormControlLabel
                                label="Show Front"
                                control={<Switch checked={this.props.showFront} />}
                                onChange={(event, checked) => {
                                    this.props.setFrontShown(checked);
                                }}
                            />
                            <FormControlLabel
                                label="Show Back"
                                control={<Switch checked={this.props.showBack} />}
                                onChange={(event, checked) => {
                                    this.props.setBackShown(checked);
                                }}
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
                <Typography>Colors</Typography>
                <Box className={classes.controlGroup}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel>Color By</InputLabel>
                        <Select
                            value={this.props.colors.colorMode}
                            onChange={(event) => {
                                const value = event.target.value as ColorMode;
                                this.props.changeColorMode(value);
                            }}
                        >
                            <MenuItem value={ColorMode.BY_CLASS}>Class</MenuItem>
                            <MenuItem value={ColorMode.BY_SCHOOL}>School</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className={classes.colorGrid}>
                        {this.props.colors.colorMode === ColorMode.BY_CLASS
                        && AllSpellClasses.map((spellClass) => {
                            const color = this.props.colors.byClass[spellClass];
                            return this.ColorPicker(
                                color,
                                spellClass,
                                this.state.showClassColorPicker === spellClass,
                                () => this.classColorClicked(spellClass),
                                (newColor) => this.classColorPicked(spellClass, newColor),
                            );
                        })}
                        {this.props.colors.colorMode === ColorMode.BY_SCHOOL
                        && AllSpellSchools.map((spellSchool) => {
                            const color = this.props.colors.bySchool[spellSchool];
                            return this.ColorPicker(
                                color,
                                spellSchool,
                                this.state.showSchoolColorPicker === spellSchool,
                                () => this.schoolColorClicked(spellSchool),
                                (newColor) => this.schoolColorPicked(spellSchool, newColor),
                            );
                        })}
                    </Box>
                </Box>
                <Box className={classes.controlGroup}>
                    <Button onClick={() => this.resetClicked()}>Reset</Button>
                </Box>
            </Box>
        );
    }
}

export default stylesConnector(reduxConnector(Controls));
