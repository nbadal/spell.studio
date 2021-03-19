import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogTitleProps } from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
        <DialogTitle disableTypography className={classes?.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            <IconButton aria-label="close" className={classes?.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
});
