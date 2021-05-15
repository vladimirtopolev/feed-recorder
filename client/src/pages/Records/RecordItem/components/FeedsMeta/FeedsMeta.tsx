import {FC, useEffect, useState} from 'react';
import {FeedMeta} from '../../../../../api/record';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography, CircularProgress
} from '@material-ui/core';
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';
import {useStyles} from './FeedsMeta.styles';
import {useCreateEditFeedMetaModal} from './hooks/useCreateEditFeedMetaModal';
import {useAxiosFetch} from '../../../../../hooks/useAxiosFetch';
import API from '../../../../../api';
import {useDeleteFeedMetaModal} from './hooks/useDeleteFeedMetaModal';

type FeedsMetaProps = {
    recordId: string
}
export const FeedsMeta: FC<FeedsMetaProps> = ({recordId}) => {
    const classes = useStyles();
    const [feedsMeta, setFeedsMeta] = useState<FeedMeta[]>([]);
    const {handleRequest, responseState: {isLoading}} = useAxiosFetch<FeedMeta[]>();

    const getFeedMeta = () => {
        handleRequest(() => API.record.getFeedRecordItems(recordId))
            .then(feedsMeta => setFeedsMeta(() => feedsMeta));
    };

    useEffect(() => {
        getFeedMeta();
    }, []);

    const {CreateEditModal, createEditModalProps, editItem, createItem} =
        useCreateEditFeedMetaModal(recordId, getFeedMeta);
    const {DeleteModal, deleteModalProps, deleteItem} = useDeleteFeedMetaModal(recordId, getFeedMeta);

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.header}>
                <Box className={classes.header__title}>
                    <Typography component="h4" variant="h5">Feeds description</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon/>}
                    onClick={() => createItem()}
                >
                    Create
                </Button>
            </Box>
            <TableContainer className={classes.tableContainer}>
                <Table size="small">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>FileName</TableCell>
                            <TableCell className={classes.tableHeadCell}>Feed URL</TableCell>
                            <TableCell className={classes.tableHeadActions} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedsMeta.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.fileName}</TableCell>
                                <TableCell>{item.feedUrl}</TableCell>
                                <TableCell>
                                    <Button onClick={() => editItem(item)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() => deleteItem(item)}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isLoading && (
                    <Box className={classes.loaderHolder}>
                        <CircularProgress/>
                    </Box>)}
            </TableContainer>
            <CreateEditModal {...createEditModalProps}/>
            <DeleteModal {...deleteModalProps}/>
        </Box>
    );
};
