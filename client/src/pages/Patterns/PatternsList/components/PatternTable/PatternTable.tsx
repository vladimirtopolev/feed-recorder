import {FC, useState} from 'react';
import {Box, Button, Collapse, IconButton, Table, TableCell, TableContainer, TableRow} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {patternListSelector} from '@store/index';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Pattern} from '@api/pattern';
import {VariableEditor} from '@pages/Patterns/PatternsList/components/VariableEditor/VariableEditor';
import {NavLink} from 'react-router-dom';
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';

type PatternRowProps = {
    pattern: Pattern
}

const PatternRow: FC<PatternRowProps> = ({pattern}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{pattern.name}</TableCell>
                <TableCell>{pattern.description}</TableCell>
                <TableCell>
                    <Button color="primary">
                        <EditIcon/>
                    </Button>
                    <Button color="secondary">
                        <DeleteIcon/>
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <VariableEditor pattern={pattern}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export const PatternTable: FC = () => {
    const {items} = useSelector(patternListSelector);
    return (
        <TableContainer>
            <Table>
                {items.map(pattern => <PatternRow pattern={pattern}/>)}
            </Table>
        </TableContainer>
    );
};