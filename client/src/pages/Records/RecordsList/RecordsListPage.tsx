import {FC, useEffect} from 'react';
import {ContentContainer} from '@components/ContentContainer/ContentContainer';
import {useSelector} from 'react-redux';
import {recordListSelector, useAppDispatch} from '@store/index';
import {RecordsTable} from '@pages/Records/RecordsList/components/RecordsTable/RecordsTable';
import {recordListRequestAction} from '@store/reducers/recordList';
import {PageHeader} from '@pages/Records/RecordsList/components/PageHeader/PageHeader';
import {recordListActions} from '@store/reducers/recordList';

export const RecordsListPage: FC = () => {

    const {isLoading, items, limit, offset, count} = useSelector(recordListSelector);
    const dispatch = useAppDispatch();

    const getItems = (options: { limit?: number, offset?: number } = {limit, offset}) => {
        const params = {
            limit: options.limit || 10,
            offset: options.offset || 0
        }
        dispatch(recordListRequestAction(params));
    };

    useEffect(() => getItems(), [limit, offset]);

    return (
        <ContentContainer isLoading={isLoading} header={<PageHeader getItems={getItems}/>}>
            <RecordsTable
                items={items}
                limit={limit}
                offset={offset}
                count={count}
                changePage={(page) => dispatch(recordListActions.changePage(page))}
                changeLimit={(limit) => dispatch(recordListActions.changeLimit(limit))}
                refreshPage={getItems}
            />
        </ContentContainer>
    );
};