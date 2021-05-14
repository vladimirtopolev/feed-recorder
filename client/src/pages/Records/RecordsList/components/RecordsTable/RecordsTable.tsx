import {FC} from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import {Record} from '../../../../../api/record';
import {useStyles} from './RecordsTable.styles';

import {Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons';
import {RecordStateCell} from './components/RecordStateCell/RecordStateCell';
import {SimulationStateCell} from './components/SimulationStateCell/SimulationStateCell';
import {UsePaginationReturn} from '../../../../../hooks/usePagination';
import {NavLink} from 'react-router-dom';
import {useDeleteRecordModal} from '../../hooks/useDeleteRecordModal';

type RecordsTableProps = UsePaginationReturn<Record>

export const RecordsTable: FC<RecordsTableProps> = ({items, itemsCount, limit, changeItemsPerPage, offset, changePage, refreshPage}) => {
    const classes = useStyles();
    const {DeleteRecordModal, deleteRecordModalProps, deleteRecord} = useDeleteRecordModal(refreshPage);

    return (
        <>
            <TableContainer className={classes.container}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>Name</TableCell>
                            <TableCell className={classes.tableHeadCell} align="center">Rercord State</TableCell>
                            <TableCell className={classes.tableHeadCell} align="center">Simulation State</TableCell>
                            <TableCell className={classes.tableHeadCell} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <RecordStateCell state={item.recordState} steps={item.recordSteps}/>
                                </TableCell>
                                <TableCell>
                                    <SimulationStateCell state={item.simulationState} step={item.simulationStep}/>
                                </TableCell>
                                <TableCell className={classes.tableBodyCellActions}>
                                    <Button
                                        color="primary" component={NavLink}
                                        to={`/records/${item.id}`}
                                    >
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() => deleteRecord(item)}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={itemsCount}
                rowsPerPage={limit}
                page={Math.floor(offset / limit)}
                onChangePage={(_, page) => {
                    changePage(page);
                }}
                onChangeRowsPerPage={(ev) => {
                    changeItemsPerPage(+ev.target.value);
                }}
            />
            <DeleteRecordModal {...deleteRecordModalProps}/>
        </>
    );
};
