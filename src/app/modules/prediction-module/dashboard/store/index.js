import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import projects from './projectsSlice';

const reducer = combineReducers({
  widgets,
  projects
});

export default reducer;
