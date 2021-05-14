import {FC} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import {IndexPage} from './Index/IndexPage';
import {PatternListPage} from './Patterns/PatternsList/PatternListPage';
import {RecordsListPage} from './Records/RecordsList/RecordsListPage';
import {RecordItemPage} from './Records/RecordItem/RecordItemPage';


export const PageSwitcher:FC = ()=>{
    return (
        <Switch>
            <Route path={'/'} exact={true}><IndexPage/></Route>
            <Route path={'/patterns'} ><PatternListPage/></Route>
            <Route path={'/records'} exact={true}><RecordsListPage/></Route>
            <Route path={'/records/:id'} ><RecordItemPage/></Route>
        </Switch>
    )
}