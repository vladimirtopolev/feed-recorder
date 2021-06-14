import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {patternListRequestAction} from '@store/reducers/patternList';
import {patternListSelector} from '@store/index';
import {ContentContainer} from '@components/ContentContainer/ContentContainer';
import {PatternTable} from '@pages/Patterns/PatternsList/components/PatternTable/PatternTable';

export const PatternListPage: FC = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(patternListSelector);
    useEffect(() => {
        dispatch(patternListRequestAction());
    }, []);

    return (
        <ContentContainer isLoading={isLoading} header="Pattern">
            <PatternTable/>
        </ContentContainer>
    );
};