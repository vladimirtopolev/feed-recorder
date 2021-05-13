import {FC} from 'react';
import API from '../../../api/index';
import {Record} from '../../../api/record';
import {ContentContainer} from '../../../components/ContentContainer/ContentContainer';
import {useAxiosFetch} from '../../../hooks/useAxiosFetch';
import {PageHeader} from './components/PageHeader/PageHeader';
import {RecordsTable} from './components/RecordsTable/RecordsTable';

export const RecordsListPage: FC = () => {
    const {responseState: {isLoading, error, response}} = useAxiosFetch<Record[]>({
        makeRequestFn: () => API.record.getItems(),
        makeRequestOnComponentMount: true
    });


    return (
        <ContentContainer isLoading={isLoading} header={<PageHeader/>}>
            {!isLoading && response && (
                <RecordsTable items={response}/>
            )}
        </ContentContainer>
    );
};