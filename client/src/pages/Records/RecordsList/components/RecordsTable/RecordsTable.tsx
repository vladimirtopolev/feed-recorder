import {FC} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {Record} from '../../../../../api/record';
import {useStyles} from './RecordsTable.styles';

import {Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons';

type RecordsTableProps = {
    items: Record[]
}

export const RecordsTable: FC<RecordsTableProps> = ({items}) =>{
    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableHeadCell}>Name</TableCell>
                        <TableCell className={classes.tableHeadCell}>Rercord State</TableCell>
                        <TableCell className={classes.tableHeadCell}>Simulation State</TableCell>
                        <TableCell className={classes.tableHeadCell}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.recordState}</TableCell>
                            <TableCell>{item.simulationState}</TableCell>
                            <TableCell className={classes.tableBodyCellActions}>
                                <Button color="primary"><EditIcon/></Button>
                                <Button color="secondary"><DeleteIcon/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
