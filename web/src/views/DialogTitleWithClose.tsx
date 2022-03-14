import React from 'react';
import { Theme } from '@mui/material/styles';
import { createStyles, withStyles } from '@mui/styles';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogTitleProps } from '@mui/material/DialogTitle/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

type MaterialStyle<S> = {
    classes: Record<keyof S, string>
}

type Props = { onClose: () => void } & DialogTitleProps & MaterialStyle<ReturnType<typeof styles>>

export const DialogTitleWithClose = withStyles(styles)((props: Props) => {
    const {
        children, classes, onClose, ...other
    } = props;
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <DialogTitle className={classes?.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            <IconButton aria-label="close" className={classes?.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
});
