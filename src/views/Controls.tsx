import React, {Component} from 'react';
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import _ from "lodash";

import {RootState} from "../store/store";
import {filterSpells} from "../store/spells/actions";
import {AllSpellClasses, SpellClass, SpellFilter} from "../store/spells/types";

import "../css/Controls.css"

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

class Controls extends Component<ReduxProps> {
    public render() {
        return (
            <div className="Controls">
                <div className="filter">
                    <label>Class:</label>
                    <select multiple size={AllSpellClasses.length}
                            value={this.props.filter.classes}
                            onChange={(event) => {
                                let classes = Array.from(event.target.selectedOptions)
                                    .map(option => option.value as SpellClass);
                                this.updateFilter({classes});
                            }}>
                        {AllSpellClasses.map(klass => (
                            <option key={klass} value={klass}>{klass}</option>
                        ))}
                    </select>
                    <button onClick={() => {
                        this.updateFilter({classes: []})
                    }}>
                        All
                    </button>
                </div>
                <div className="filter">
                    <label>Min Level:</label>
                    <select value={this.props.filter.levelMin} onChange={(event) => {
                        let levelMin = Number.parseInt(event.target.value);
                        this.updateFilter({levelMin})
                    }}>
                        {_.range(0, this.props.filter.levelMax + 1)
                            .map(n => (
                                <option key={n} value={n}>{n || "Cantrip"}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="filter">
                    <label>Max Level:</label>
                    <select value={this.props.filter.levelMax} onChange={(event) => {
                        let levelMax = Number.parseInt(event.target.value);
                        this.updateFilter({levelMax})
                    }}>
                        {_.range(this.props.filter.levelMin, 10)
                            .map(n => (
                                <option key={n} value={n}>{n || "Cantrip"}</option>
                            ))
                        }
                    </select>
                </div>
                <div>Result: {this.props.spellCount}</div>
            </div>
        );
    }

    private updateFilter(newData: any) {
        let newFilter = Object.assign({}, this.props.filter);
        Object.assign(newFilter, newData);
        this.props.updateFilter(newFilter);
    }
}

export default reduxConnector(Controls);
