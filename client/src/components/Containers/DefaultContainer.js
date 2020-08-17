import React, { lazy, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import NavBar from '../layout/Navbar';
import SideBar from '../layout/Sidebar';
import './Containers.css';

const TransactionComponent = lazy(() =>
  import('../transactions/TransactionComponent')
);
const TransactionChart = lazy(() => import('../chart/TransactionChart'));
const About = lazy(() => import('../about/about'));

export const DefaultContainer = () => (
  <React.Fragment>
    <NavBar />
    <SideBar />
    <div className='body__container'>
      <Suspense
        fallback={
          <div className='fallback__loader'>
            <h3>
              <i className='fa fa-cog fa-spin' />
              Loading...
            </h3>
          </div>
        }
      >
        <Route exact path='/' render={() => <Redirect to='/transactions' />} />
        <Route path='/transactions' component={TransactionComponent} />
        <Route path='/chart' component={TransactionChart} />
        <Route path='/about' component={About} />
      </Suspense>
    </div>
  </React.Fragment>
);
