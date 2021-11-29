import Logout from './components/Logout';

import Home from './components/Content/Home/Home';

import Data from './components/Content/Data/Data';
import DataAdd from './components/Content/Data/DataAdd';
import DataEdit from './components/Content/Data/DataEdit';
import DataPreview from './components/Content/Data/DataPreview';

import Metadata from './components/Content/Metadata/Data';
import MetadataAdd from './components/Content/Metadata/DataAdd';
import MetadataEdit from './components/Content/Metadata/DataEdit';
import MetadataPreview from './components/Content/Metadata/DataPreview';


import { Switch, Route } from "react-router-dom";

export default function MenuRouting() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/data/add">
                <DataAdd />
            </Route>
            <Route path="/data/preview/:dataId">
                <DataPreview />
            </Route>
            <Route path="/data/edit/:dataId">
                <DataEdit />
            </Route>
            <Route path="/data">
                <Data />
            </Route>

            <Route path="/metadata/add">
                <MetadataAdd />
            </Route>
            <Route path="/metadata/preview/:dataId">
                <MetadataPreview />
            </Route>
            <Route path="/metadata/edit/:dataId">
                <MetadataEdit />
            </Route>
            <Route path="/metadata">
                <Metadata />
            </Route>
            
            <Route path="/logout">
                <Logout />
            </Route>
        </Switch>
      
    )
}