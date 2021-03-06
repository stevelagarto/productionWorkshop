import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BlogNew from './blogs/BlogNew';
import BlogShow from './blogs/BlogShow';
import BlogEdit from './blogs/BlogEdit';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#47487e'
      },
      secondary: {
        main: '#FFFFFF'
      }
    }
  },
)

const App = ({ fetchUser}) => {
  useEffect( () => {
    fetchUser();
  },[])
  
  function handleSubmit(values) {

   
      // const { submitBlog, history, formValues } = props;
     console.log('VALUESSSSS', values)
   }
 
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='test'>
          <Header />
          <div className="container">
          <Switch>
            <Route exact path="/blogs/edit/:_id" component={BlogEdit} onSubmit={handleSubmit} />
            <Route path="/blogs/new" component={BlogNew} />
            <Route exact path="/blogs/:_id" component={BlogShow}  />
            <Route path="/blogs" component={Dashboard} />
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default connect(null, actions)(App);
