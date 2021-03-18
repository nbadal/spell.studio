import React from 'react';

import '../css/AddCard.css';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';

export const AddCard = () => (
    <div className="AddCard">
        <AddIcon fontSize="inherit" style={{ color: grey[500] }} />
    </div>
);
