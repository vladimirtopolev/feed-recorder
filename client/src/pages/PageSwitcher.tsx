import {FC} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import {IndexPage} from './Index/IndexPage';
import {PatternListPage} from './Patterns/PatternsList/PatternListPage';
import {RecordsListPage} from './Records/RecordsList/RecordsListPage';


export const PageSwitcher:FC = ()=>{
    return (
        <Switch>
            <Route path={'/'} exact={true}><IndexPage/></Route>
            <Route path={'/patterns'} ><PatternListPage/></Route>
            <Route path={'/records'} ><RecordsListPage/></Route>
        </Switch>
    )
}