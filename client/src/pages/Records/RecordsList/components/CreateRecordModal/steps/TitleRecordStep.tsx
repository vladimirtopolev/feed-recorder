import React, {FC} from 'react';
import {Box, Button, DialogActions, DialogContent, TextField} from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import {
    CreateStrategy,
    useCreateRecordModalContext
} from '@pages/Records/RecordsList/components/CreateRecordModal/useCreateRecordModal';
import useStyles from './TitleRecordStep.styles';

export const TitleStep: FC = () => {
    const {createStrategy, setCreateStrategy, changeStep, step, onClose, setRecord, record, createRecord} = useCreateRecordModalContext();
    const classes = useStyles();
    return (
        <>
            <DialogContent dividers>
                <TextField
                    className={classes.input}
                    label="Record Name"
                    value={record.name}
                    onChange={(e) => setRecord({...record, name: e.target.value})}
                />

                <Box className={classes.createTypeContainer}>
                <ToggleButtonGroup
                    exclusive={true}
                    value={createStrategy}
                    onChange={(e, val) => {
                        val !== null && setCreateStrategy(val);
                    }}>
                    <ToggleButton
                        value={CreateStrategy.FROM_SCRATCH}
                    >
                        <BuildIcon/>
                        From scratch
                    </ToggleButton>
                    <ToggleButton value={CreateStrategy.FROM_PATTERN}>
                        <AccountTreeIcon/>
                        FROM PATTERN
                    </ToggleButton>
                </ToggleButtonGroup>
                </Box>
            </DialogContent>
            <DialogActions disableSpacing>
                <Button className={classes.button} onClick={onClose}>Close</Button>
                {createStrategy === CreateStrategy.FROM_PATTERN && (
                    <Button
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={() => changeStep(step + 1)}
                    >
                        Next
                    </Button>
                )}
                {createStrategy === CreateStrategy.FROM_SCRATCH && (
                    <Button
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            createRecord({...record});
                        }}
                    >
                        Create
                    </Button>
                )}
            </DialogActions>
        </>
    );
};
