import {FC} from 'react';
import API from '../../../api/index';
import {Record} from '../../../api/record';
import {ContentContainer} from '../../../components/ContentContainer/ContentContainer';
import {PageHeader} from './components/PageHeader/PageHeader';
import {RecordsTable} from './components/RecordsTable/RecordsTable';
import {usePagination} from '../../../hooks/usePagination';

export const RecordsListPage: FC = () => {

    const paginationState = usePagination<Record>((options) => API.record.getItems(options));
    const {isLoading, error} = paginationState;

    return (
        <ContentContainer isLoading={isLoading} header={<PageHeader/>}>
            {!isLoading && !error && (
                <RecordsTable {...paginationState}/>
            )}
        </ContentContainer>
    );
};