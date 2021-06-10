import React, {FC} from 'react';
import {useCreateRecordModalContext} from '@pages/Records/RecordsList/components/CreateRecordModal/useCreateRecordModal';
import {
    Box,
    Typography,
    TextField,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow, Button, DialogContent, DialogActions
} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import useStyles from './PatternPopulationStep.styles';

const fillPattern = (pattern: string, fillingValues: { [key: string]: string }): string => {
    return Object.entries(fillingValues).reduce((memo, [key, value]) => {
        return value ? memo.replaceAll('${' + key + '}', value) : memo;
    }, pattern);
};

export const PatternPopulationStep: FC = () => {
    const classes = useStyles();
    const {onClose, changeStep, step, createRecord, record} = useCreateRecordModalContext();
    const {selectedPattern} = useCreateRecordModalContext();
    const {control, watch} = useForm();

    const values = watch();

    const filledPattern = (selectedPattern?.feedMetaPatterns || [])
        .map(pattern => ({
            feedUrl: fillPattern(pattern.feedUrl, values),
            fileName: fillPattern(pattern.fileName, values),
        }));

    return (
        <>
            <DialogContent dividers>
                <Box className={classes.section}>
                    <Typography className={classes.title}>Variables</Typography>
                    <Box>
                        {selectedPattern && selectedPattern.variables.map(variable => {
                            return (
                                <Controller
                                    control={control}
                                    key={variable.key}
                                    name={variable.key}
                                    render={({field}) => <TextField className={classes.input} {...field}
                                                                    label={variable.key}/>}
                                />
                            );
                        })}
                    </Box>
                </Box>
                <Box className={classes.section}>
                    <Typography className={classes.title}>Filled pattern</Typography>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableBody>
                                    {filledPattern.map((pattern, i) => {
                                        return (
                                            <TableRow key={i} className={classes.tableRow}>
                                                <Table size="small" className={classes.secondaryTable}>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell
                                                                className={classes.secondaryTitleCell}>FileName</TableCell>
                                                            <TableCell className={classes.secondaryTableCell}
                                                                       align="left">{pattern.fileName}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                className={classes.secondaryTitleCell}>FeedUrl</TableCell>
                                                            <TableCell className={classes.secondaryTableCell}
                                                                       align="left">
                                                                <a
                                                                    href={pattern.feedUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >{pattern.feedUrl}</a></TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions disableSpacing>
                <Button
                    className={classes.button}
                    onClick={onClose}>Close</Button>
                <Button
                    className={classes.button}
                    onClick={() => changeStep(step - 1)}
                    color="primary"
                    variant="contained">Back</Button>
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        createRecord({...record, feedsMeta: filledPattern});
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </>
    );
};