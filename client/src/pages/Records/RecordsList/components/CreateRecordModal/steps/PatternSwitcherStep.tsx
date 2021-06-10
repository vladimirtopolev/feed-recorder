import React, {FC} from 'react';
import {Box, Select, MenuItem, FormControl, InputLabel, Button, DialogContent, DialogActions} from '@material-ui/core';
import {useCreateRecordModalContext} from '../useCreateRecordModal';
import useStyles from './PatternSwitcherStep.styles';

export const PatternSwitcherStep: FC = () => {
    const {selectedPattern, setPattern, patterns, onClose, step, changeStep} = useCreateRecordModalContext();
    const classes = useStyles();
    return (
        <>
            <DialogContent dividers>
            <FormControl className={classes.input}>
                <InputLabel>Pattern</InputLabel>
                <Select value={selectedPattern?._id}
                        onChange={(e) => {
                            setPattern(patterns.find(p => p._id === e.target.value));
                        }}>
                    {patterns.map(pattern => (
                        <MenuItem
                            key={pattern._id}
                            value={pattern._id}
                        >
                            {pattern.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions disableSpacing>
                <Button className={classes.button} onClick={onClose}>Close</Button>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => changeStep(step - 1)}
                >
                    Back
                </Button>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => changeStep(step + 1)}
                >
                    Next
                </Button>
            </DialogActions>

        </>
    );
};