import React, {Fragment, useState} from 'react';
import './State-PageCss.css'
import Container from '../Comments/Container.js'
import { Timeline } from 'react-twitter-widgets'
import stateTwitters from '../../data/stateTwitters.json'
import stateAbbr from '../../data/stateAbbr.json'
import {fetchSingleStateMetaData, fetchCurrentSingleStateValues} from '../../API/InfectionsAPI'; 

import {
  CardBody,
  Card,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function State_Page(props){
  const STATENAME = props.sName
  let stateName = sessionStorage.getItem('stateName')

  const triggerText = 'Add Comment';
  const twitterHandle = stateTwitters[stateName]

  const [singleStateMetaData, setSingleStateMetaData]=useState([])

  // Get saved data from sessionStorage
  const abbrState = stateAbbr[stateName]

  React.useEffect(() => {
        async function getSingleStateMetaData() {
        const data = await fetchSingleStateMetaData(abbrState)
        setSingleStateMetaData(data)
    } 
    getSingleStateMetaData()
  },[abbrState])

  const [currentSingleStateValues, setCurrentSingleStateValues]=useState([])

  React.useEffect(() => {
      async function getCurrentSingleStateValues() {
      const data = await fetchCurrentSingleStateValues(abbrState)
      setCurrentSingleStateValues(data)
    }
    getCurrentSingleStateValues()
  },[abbrState])

  const statesCovid19HealthWebsite = <a href={singleStateMetaData.covid19Site} target="_blank" rel="noreferrer">Visit State Website</a>
  
  const formatNumber = (number) => {
    var nf = new Intl.NumberFormat();
    return nf.format(number);
  };

  console.log('xx', currentSingleStateValues)

  const infoBox = [currentSingleStateValues].map(function (values, index) {
    return (
      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="position-relative px-5 py-3">
          <Card className="card-box bg-premium-dark border-0 text-light mb-5">
            <CardBody className="b-info-card">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Positive Cases
                  </small>
                  <span className="font-size-xxl mt-1">
                    {formatNumber(values.positive)}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  className="text-success mr-1"
                />
                <span className="text-success pr-1">
                  {formatNumber(values.positiveIncrease)}
                </span>
                <span className="text-white-50">today</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="position-relative px-5 py-3">
          <Card className="card-box bg-midnight-bloom text-light mb-5">
            <CardBody className="b-info-card">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Deaths
                  </small>
                  <span className="font-size-xxl mt-1">
                    {formatNumber(values.death)}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  className="text-success mr-1"
                />
                <span className="text-success pr-1">
                  {formatNumber(values.deathIncrease)}
                </span>
                <span className="text-white-50">today</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="position-relative px-5 py-3">
          <Card className="card-box bg-vicious-stance text-light mb-5">
            <CardBody className="b-info-card">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Total Tests
                  </small>
                  <span className="font-size-xxl mt-1">
                    {formatNumber(values.totalTestResults)}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  className="text-success mr-1"
                />
                <span className="text-success pr-1">
                  {formatNumber(values.totalTestResultsIncrease)}
                </span>
                <span className="text-white-50">today</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  });

  return (
    <div id="StatePage-container">
      <div className="a-api_feed_container">
        <Fragment>
          <Card className="card-box mb-5">
            <div className="card-header pr-2">
              <div className="text-uppercase card-header--title">
                Insight from Locals
              </div>
              <div className="card-header--actions"></div>
            </div>
            <CardBody>
              <div className="table-responsive-md">
                Nothing to show - Be the first to add a comment!
              </div>
            </CardBody>
            <div className="card-footer d-flex justify-content-between">
              <div className="a-api_add_feed_button">
                <Container triggerText={triggerText} />
              </div>
            </div>
          </Card>
        </Fragment>
      </div>
      <div>
        <Fragment>
          <div className="b-info-updater">{infoBox}</div>
        </Fragment>
      </div>
      <div className="a-state_info_container">
        <Fragment>
          <Card className="card-box mb-5">
            <div className="card-header d-block">
              <span className="text-uppercase py-3 py-xl-4 text-black d-block text-center font-weight-bold font-size-lg">
                {STATENAME} Health Department
              </span>
              <div className="text-center">{statesCovid19HealthWebsite}</div>
            </div>
            <CardBody>
              <Timeline
                dataSource={{
                  sourceType: "profile",
                  screenName: twitterHandle,
                }}
                options={{
                  height: "800",
                }}
              />
            </CardBody>
          </Card>
        </Fragment>
      </div>
    </div>
  );
}

export default State_Page
