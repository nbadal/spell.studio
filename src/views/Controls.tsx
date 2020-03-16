import React, {Component} from 'react';
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";

import {RootState} from "../store/store";
import _ from "lodash";
import {filterSpells} from "../store/spells/actions";
import {SpellFilter} from "../store/spells/types";


const mapStateToProps = (state: RootState) => ({
    filter: state.spells.filter,
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
                Min Level:
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

                Max Level:
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
        );
    }

    private updateFilter(newData: any) {
        let newFilter = Object.assign({}, this.props.filter);
        Object.assign(newFilter, newData);
        this.props.updateFilter(newFilter);
    }
}

export default reduxConnector(Controls);
