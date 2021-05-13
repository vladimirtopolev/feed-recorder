import {FC} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {Record} from '../../../../../api/record';

import {Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons';

type RecordsTableProps = {
    items: Record[]
}

export const RecordsTable: FC<RecordsTableProps> = ({items}) =>{
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Rercord State</TableCell>
                        <TableCell>Simulation State</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.recordState}</TableCell>
                            <TableCell>{item.simulationState}</TableCell>
                            <TableCell>
                                <Button><EditIcon/></Button>
                                <Button><DeleteIcon/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
