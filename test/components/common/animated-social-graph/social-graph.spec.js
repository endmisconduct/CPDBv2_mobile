import React from 'react';
import { stub } from 'sinon';
import { mount } from 'enzyme';
import { forOwn, find, filter, round } from 'lodash';
import should from 'should';

import SocialGraph from 'components/common/animated-social-graph/social-graph';


describe('SocialGraph', function () {
  let wrapper;
  const officers = [
    { fullName: 'Glenn Evans', id: 8138 },
    { fullName: 'Isaac Lee', id: 15956 },
    { fullName: 'Thomas Kampenga', id: 14045 },
    { fullName: 'Melvin Ector', id: 31945 },
    { fullName: 'Sean Brandon', id: 2671 },
    { fullName: 'Estella Perez-Stanford', id: 22297 },
    { fullName: 'Johnny Cavers', id: 4269 },
    { fullName: 'Gilbert Cobb', id: 4881 },
    { fullName: 'John Hart', id: 11580 },
    { fullName: 'William Roberison', id: 24157 },
    { fullName: 'Francis Higgins', id: 12176 },
    { fullName: 'David Portis', id: 22861 },
    { fullName: 'Eugene Offett', id: 21194 },
    { fullName: 'Joseph Blaye', id: 2171 },
    { fullName: 'Charles Toussas', id: 28805 },
    { fullName: 'Bennie Watson', id: 30209 },
    { fullName: 'Tracy Hughes', id: 12737 },
    { fullName: 'Donnell Calhoun', id: 3663 },
    { fullName: 'Hardy White', id: 30466 },
    { fullName: 'Matthew Brandon', id: 2675 }
  ];
  const coaccusedData = [
    { officerId1: 2675, officerId2: 24157, incidentDate: '1990-01-09T00:00:00Z', accussedCount: 2 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
    { officerId1: 22861, officerId2: 30466, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-07-06T00:00:00Z', accussedCount: 3 },
    { officerId1: 22861, officerId2: 30466, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 3 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 4 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 3 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1992-03-08T00:00:00Z', accussedCount: 5 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1992-07-18T00:00:00Z', accussedCount: 2 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1993-02-15T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1993-03-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1993-04-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 22861, incidentDate: '1993-06-01T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1993-06-03T00:00:00Z', accussedCount: 3 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1993-06-09T00:00:00Z', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1993-07-13T00:00:00Z', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1993-10-16T00:00:00Z', accussedCount: 4 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1994-01-09T00:00:00Z', accussedCount: 5 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-01-31T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-01-31T00:00:00Z', accussedCount: 4 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-01-31T00:00:00Z', accussedCount: 2 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-01-31T00:00:00Z', accussedCount: 5 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-01-31T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 14045, incidentDate: '1994-02-15T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-02-26T00:00:00Z', accussedCount: 5 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-06T00:00:00Z', accussedCount: 6 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-03-07T00:00:00Z', accussedCount: 6 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-03-07T00:00:00Z', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-07T00:00:00Z', accussedCount: 7 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-12T00:00:00Z', accussedCount: 8 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-03-12T00:00:00Z', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-03-12T00:00:00Z', accussedCount: 7 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-04-17T00:00:00Z', accussedCount: 9 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 10 },
    { officerId1: 12176, officerId2: 21194, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 2 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 5 },
    { officerId1: 3663, officerId2: 14045, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 3 },
    { officerId1: 3663, officerId2: 12176, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 4881, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 2 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 8 },
    { officerId1: 14045, officerId2: 21194, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 3 },
    { officerId1: 4881, officerId2: 14045, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 2 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-05-24T00:00:00Z', accussedCount: 3 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-06-21T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-06-21T00:00:00Z', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-06-21T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-08-17T00:00:00Z', accussedCount: 7 },
    { officerId1: 4269, officerId2: 30209, incidentDate: '1995-02-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1995-05-21T00:00:00Z', accussedCount: 8 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1995-07-28T00:00:00Z', accussedCount: 9 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-01-20T00:00:00Z', accussedCount: 5 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1996-01-22T00:00:00Z', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-04-20T00:00:00Z', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-05-28T00:00:00Z', accussedCount: 7 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-07-27T00:00:00Z', accussedCount: 8 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1996-12-27T00:00:00Z', accussedCount: 2 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1996-12-30T00:00:00Z', accussedCount: 3 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-06-20T00:00:00Z', accussedCount: 4 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-07-11T00:00:00Z', accussedCount: 5 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-08-23T00:00:00Z', accussedCount: 6 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1998-06-27T00:00:00Z', accussedCount: 7 },
    { officerId1: 3663, officerId2: 8138, incidentDate: '1998-06-27T00:00:00Z', accussedCount: 2 },
    { officerId1: 8138, officerId2: 30466, incidentDate: '1998-06-27T00:00:00Z', accussedCount: 2 },
    { officerId1: 4269, officerId2: 15956, incidentDate: '1998-09-22T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '1998-11-09T00:00:00Z', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1998-11-17T00:00:00Z', accussedCount: 2 },
    { officerId1: 2671, officerId2: 4269, incidentDate: '1998-11-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 30209, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 30466, officerId2: 31945, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 30209, officerId2: 31945, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 30209, officerId2: 30466, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 3 },
    { officerId1: 3663, officerId2: 30466, incidentDate: '1998-12-03T00:00:00Z', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-02-08T00:00:00Z', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-03-30T00:00:00Z', accussedCount: 4 },
    { officerId1: 2671, officerId2: 4269, incidentDate: '1999-07-22T00:00:00Z', accussedCount: 3 },
    { officerId1: 4269, officerId2: 15956, incidentDate: '1999-07-22T00:00:00Z', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-07-22T00:00:00Z', accussedCount: 5 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-11-16T00:00:00Z', accussedCount: 6 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-12-15T00:00:00Z', accussedCount: 7 },
    { officerId1: 4881, officerId2: 21194, incidentDate: '2000-04-20T00:00:00Z', accussedCount: 2 },
    { officerId1: 4881, officerId2: 31945, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 4881, officerId2: 21194, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 3 },
    { officerId1: 4269, officerId2: 4881, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 21194, officerId2: 31945, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 4269, officerId2: 21194, incidentDate: '2000-04-28T00:00:00Z', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-05-20T00:00:00Z', accussedCount: 9 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-05-20T00:00:00Z', accussedCount: 8 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-09-21T00:00:00Z', accussedCount: 10 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-01-15T00:00:00Z', accussedCount: 11 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-02-22T00:00:00Z', accussedCount: 12 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-07-09T00:00:00Z', accussedCount: 13 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-10-02T00:00:00Z', accussedCount: 14 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-10-19T00:00:00Z', accussedCount: 15 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-04-01T00:00:00Z', accussedCount: 3 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '2002-09-28T00:00:00Z', accussedCount: 4 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-09-28T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2002-10-13T00:00:00Z', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '2002-10-13T00:00:00Z', accussedCount: 5 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-10-13T00:00:00Z', accussedCount: 5 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2003-10-25T00:00:00Z', accussedCount: 4 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2003-10-25T00:00:00Z', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2006-03-15T00:00:00Z', accussedCount: 16 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2006-09-11T00:00:00Z', accussedCount: 17 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2008-01-11T00:00:00Z', accussedCount: 18 }
  ];
  const listEvent = [
    '1990-01-09 00:00:00+00:00',
    '1991-02-20 00:00:00+00:00',
    '1991-07-06 00:00:00+00:00',
    '1991-08-07 00:00:00+00:00',
    '1992-03-08 00:00:00+00:00',
    '1992-07-18 00:00:00+00:00',
    '1993-02-15 00:00:00+00:00',
    '1993-03-28 00:00:00+00:00',
    '1993-04-03 00:00:00+00:00',
    '1993-06-01 00:00:00+00:00',
    '1993-06-03 00:00:00+00:00',
    '1993-06-09 00:00:00+00:00',
    '1993-07-13 00:00:00+00:00',
    '1993-10-16 00:00:00+00:00',
    '1994-01-09 00:00:00+00:00',
    '1994-01-31 00:00:00+00:00',
    '1994-02-15 00:00:00+00:00',
    '1994-02-26 00:00:00+00:00',
    '1994-03-06 00:00:00+00:00',
    '1994-03-07 00:00:00+00:00',
    '1994-03-12 00:00:00+00:00',
    '1994-04-17 00:00:00+00:00',
    '1994-05-24 00:00:00+00:00',
    '1994-06-21 00:00:00+00:00',
    '1994-08-17 00:00:00+00:00',
    '1995-02-28 00:00:00+00:00',
    '1995-05-21 00:00:00+00:00',
    '1995-07-28 00:00:00+00:00',
    '1996-01-20 00:00:00+00:00',
    '1996-01-22 00:00:00+00:00',
    '1996-04-20 00:00:00+00:00',
    '1996-05-28 00:00:00+00:00',
    '1996-07-27 00:00:00+00:00',
    '1996-12-27 00:00:00+00:00',
    '1996-12-30 00:00:00+00:00',
    '1997-06-20 00:00:00+00:00',
    '1997-07-11 00:00:00+00:00',
    '1997-08-23 00:00:00+00:00',
    '1998-06-27 00:00:00+00:00',
    '1998-09-22 00:00:00+00:00',
    '1998-11-09 00:00:00+00:00',
    '1998-11-17 00:00:00+00:00',
    '1998-11-28 00:00:00+00:00',
    '1998-12-03 00:00:00+00:00',
    '1999-02-08 00:00:00+00:00',
    '1999-03-30 00:00:00+00:00',
    '1999-07-22 00:00:00+00:00',
    '1999-11-16 00:00:00+00:00',
    '1999-12-15 00:00:00+00:00',
    '2000-04-20 00:00:00+00:00',
    '2000-04-28 00:00:00+00:00',
    '2000-05-20 00:00:00+00:00',
    '2000-09-21 00:00:00+00:00',
    '2001-01-15 00:00:00+00:00',
    '2001-02-22 00:00:00+00:00',
    '2001-07-09 00:00:00+00:00',
    '2001-10-02 00:00:00+00:00',
    '2001-10-19 00:00:00+00:00',
    '2002-04-01 00:00:00+00:00',
    '2002-09-28 00:00:00+00:00',
    '2002-10-13 00:00:00+00:00',
    '2003-10-25 00:00:00+00:00',
    '2006-03-15 00:00:00+00:00',
    '2006-09-11 00:00:00+00:00',
    '2008-01-11 00:00:00+00:00'
  ];

  it('should render all sections correctly', function () {
    const startTimelineFromBeginningStub = stub();
    const stopTimelineStub = stub();
    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        startTimelineFromBeginning={ startTimelineFromBeginningStub }
        stopTimeline={ stopTimelineStub }
      />
    );

    const instance = wrapper.instance();

    const expectedNodes = [
      { id: 0, fname: 'Glenn Evans', uid: 8138, degree: 3 },
      { id: 1, fname: 'Isaac Lee', uid: 15956, degree: 2 },
      { id: 2, fname: 'Thomas Kampenga', uid: 14045, degree: 6 },
      { id: 3, fname: 'Melvin Ector', uid: 31945, degree: 7 },
      { id: 4, fname: 'Sean Brandon', uid: 2671, degree: 2 },
      { id: 5, fname: 'Estella Perez-Stanford', uid: 22297, degree: 0 },
      { id: 6, fname: 'Johnny Cavers', uid: 4269, degree: 7 },
      { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 5 },
      { id: 8, fname: 'John Hart', uid: 11580, degree: 2 },
      { id: 9, fname: 'William Roberison', uid: 24157, degree: 1 },
      { id: 10, fname: 'Francis Higgins', uid: 12176, degree: 4 },
      { id: 11, fname: 'David Portis', uid: 22861, degree: 3 },
      { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 7 },
      { id: 13, fname: 'Joseph Blaye', uid: 2171, degree: 0 },
      { id: 14, fname: 'Charles Toussas', uid: 28805, degree: 4 },
      { id: 15, fname: 'Bennie Watson', uid: 30209, degree: 4 },
      { id: 16, fname: 'Tracy Hughes', uid: 12737, degree: 0 },
      { id: 17, fname: 'Donnell Calhoun', uid: 3663, degree: 10 },
      { id: 18, fname: 'Hardy White', uid: 30466, degree: 6 },
      { id: 19, fname: 'Matthew Brandon', uid: 2675, degree: 1 }
    ];

    const expectedLinks = [
      { sourceUid: 2675, targetUid: 24157, weight: 2, className: '' },
      { sourceUid: 22861, targetUid: 30466, weight: 3, className: '' },
      { sourceUid: 11580, targetUid: 22861, weight: 5, className: '' },
      { sourceUid: 14045, targetUid: 22861, weight: 2, className: '' },
      { sourceUid: 14045, targetUid: 28805, weight: 10, className: '' },
      { sourceUid: 12176, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 12176, targetUid: 14045, weight: 4, className: '' },
      { sourceUid: 3663, targetUid: 14045, weight: 3, className: '' },
      { sourceUid: 3663, targetUid: 12176, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 4881, weight: 2, className: '' },
      { sourceUid: 12176, targetUid: 28805, weight: 8, className: '' },
      { sourceUid: 14045, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 4881, targetUid: 14045, weight: 2, className: '' },
      { sourceUid: 21194, targetUid: 28805, weight: 4, className: '' },
      { sourceUid: 4269, targetUid: 30209, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 21194, weight: 9, className: '' },
      { sourceUid: 11580, targetUid: 30466, weight: 6, className: '' },
      { sourceUid: 3663, targetUid: 28805, weight: 8, className: '' },
      { sourceUid: 8138, targetUid: 31945, weight: 7, className: '' },
      { sourceUid: 3663, targetUid: 8138, weight: 2, className: '' },
      { sourceUid: 8138, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 30209, weight: 2, className: '' },
      { sourceUid: 30466, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 30209, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 30209, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 2671, targetUid: 4269, weight: 3, className: '' },
      { sourceUid: 4269, targetUid: 15956, weight: 3, className: '' },
      { sourceUid: 4881, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 4881, targetUid: 21194, weight: 3, className: '' },
      { sourceUid: 4269, targetUid: 4881, weight: 2, className: '' },
      { sourceUid: 21194, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 4269, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 31945, weight: 5, className: '' },
      { sourceUid: 4269, targetUid: 31945, weight: 5, className: '' },
      { sourceUid: 3663, targetUid: 4269, weight: 3, className: '' },
      { sourceUid: 2671, targetUid: 15956, weight: 18, className: 'current-link' }
    ];

    const expectedLinkedByIndex = {
      '0,0': 1, '0,18': 1, '0,3': 1, '1,1': 1, '10,10': 1, '10,12': 1, '10,14': 1, '10,2': 1,
      '11,11': 1, '11,18': 1, '12,12': 1, '12,14': 1, '12,3': 1, '13,13': 1, '14,14': 1, '15,15': 1,
      '15,18': 1, '15,3': 1, '16,16': 1, '17,0': 1, '17,10': 1, '17,12': 1, '17,14': 1, '17,15': 1,
      '17,17': 1, '17,18': 1, '17,2': 1, '17,3': 1, '17,6': 1, '17,7': 1, '18,18': 1, '18,3': 1,
      '19,19': 1, '19,9': 1, '2,11': 1, '2,12': 1, '2,14': 1, '2,2': 1, '3,3': 1, '4,1': 1, '4,4': 1,
      '4,6': 1, '5,5': 1, '6,1': 1, '6,12': 1, '6,15': 1, '6,3': 1, '6,6': 1, '6,7': 1,
      '7,12': 1, '7,2': 1, '7,3': 1, '7,7': 1, '8,11': 1, '8,18': 1, '8,8': 1, '9,9': 1,
    };

    const graphNodes = instance.data.nodes;

    graphNodes.length.should.eql(expectedNodes.length);
    for (let index=0; index < graphNodes.length; index++) {
      const expectedNode = expectedNodes[index];
      const graphNode = graphNodes[index];
      forOwn(expectedNode, (value, key) => {
        graphNode[key].should.eql(value);
      });
    }

    const graphLinks = instance.data.links;
    graphLinks.length.should.eql(expectedLinks.length);
    graphLinks.forEach((graphLink) => {
      const expectedLink = find(expectedLinks, (link) => {
        return link.sourceUid === graphLink.source.uid && link.targetUid === graphLink.target.uid;
      });

      graphLink.weight.should.eql(expectedLink.weight);
      graphLink.className.should.eql(expectedLink.className);
    });
    instance.data.linkedByIndex.should.eql(expectedLinkedByIndex);

    wrapper.getDOMNode().getElementsByClassName('node').length.should.eql(expectedNodes.length);
    wrapper.getDOMNode().getElementsByClassName('link').length.should.eql(expectedLinks.length);

    startTimelineFromBeginningStub.called.should.be.true();
    stopTimelineStub.called.should.be.true();
  });

  it('should re-render all sections correctly with timelineIdx change', function () {
    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();
    wrapper.setProps({ timelineIdx: 14 });

    const expectedNodes = [
      { id: 0, fname: 'Glenn Evans', uid: 8138, degree: 0 },
      { id: 1, fname: 'Isaac Lee', uid: 15956, degree: 0 },
      { id: 2, fname: 'Thomas Kampenga', uid: 14045, degree: 2 },
      { id: 3, fname: 'Melvin Ector', uid: 31945, degree: 0 },
      { id: 4, fname: 'Sean Brandon', uid: 2671, degree: 0 },
      { id: 5, fname: 'Estella Perez-Stanford', uid: 22297, degree: 0 },
      { id: 6, fname: 'Johnny Cavers', uid: 4269, degree: 0 },
      { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 0 },
      { id: 8, fname: 'John Hart', uid: 11580, degree: 2 },
      { id: 9, fname: 'William Roberison', uid: 24157, degree: 1 },
      { id: 10, fname: 'Francis Higgins', uid: 12176, degree: 1 },
      { id: 11, fname: 'David Portis', uid: 22861, degree: 3 },
      { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 1 },
      { id: 13, fname: 'Joseph Blaye', uid: 2171, degree: 0 },
      { id: 14, fname: 'Charles Toussas', uid: 28805, degree: 2 },
      { id: 15, fname: 'Bennie Watson', uid: 30209, degree: 0 },
      { id: 16, fname: 'Tracy Hughes', uid: 12737, degree: 0 },
      { id: 17, fname: 'Donnell Calhoun', uid: 3663, degree: 1 },
      { id: 18, fname: 'Hardy White', uid: 30466, degree: 2 },
      { id: 19, fname: 'Matthew Brandon', uid: 2675, degree: 1 }
    ];

    const expectedLinks = [
      { sourceUid: 2675, targetUid: 24157, weight: 2, className: '' },
      { sourceUid: 22861, targetUid: 30466, weight: 3, className: '' },
      { sourceUid: 11580, targetUid: 22861, weight: 5, className: '' },
      { sourceUid: 14045, targetUid: 22861, weight: 2, className: '' },
      { sourceUid: 14045, targetUid: 28805, weight: 3, className: '' },
      { sourceUid: 3663, targetUid: 21194, weight: 3, className: '' },
      { sourceUid: 12176, targetUid: 28805, weight: 4, className: '' },
      { sourceUid: 11580, targetUid: 30466, weight: 5, className: 'current-link' },
    ];

    const expectedLinkedByIndex = {
      '0,0': 1, '0,18': 1, '0,3': 1, '1,1': 1, '10,10': 1, '10,12': 1, '10,14': 1, '10,2': 1,
      '11,11': 1, '11,18': 1, '12,12': 1, '12,14': 1, '12,3': 1, '13,13': 1, '14,14': 1, '15,15': 1,
      '15,18': 1, '15,3': 1, '16,16': 1, '17,0': 1, '17,10': 1, '17,12': 1, '17,14': 1, '17,15': 1,
      '17,17': 1, '17,18': 1, '17,2': 1, '17,3': 1, '17,6': 1, '17,7': 1, '18,18': 1, '18,3': 1,
      '19,19': 1, '19,9': 1, '2,11': 1, '2,12': 1, '2,14': 1, '2,2': 1, '3,3': 1, '4,1': 1, '4,4': 1,
      '4,6': 1, '5,5': 1, '6,1': 1, '6,12': 1, '6,15': 1, '6,3': 1, '6,6': 1, '6,7': 1,
      '7,12': 1, '7,2': 1, '7,3': 1, '7,7': 1, '8,11': 1, '8,18': 1, '8,8': 1, '9,9': 1,
    };

    const graphNodes = instance.data.nodes;

    graphNodes.length.should.eql(expectedNodes.length);
    for (let index=0; index < graphNodes.length; index++) {
      const expectedNode = expectedNodes[index];
      const graphNode = graphNodes[index];
      forOwn(expectedNode, (value, key) => {
        graphNode[key].should.eql(value);
      });
    }

    const graphLinks = instance.data.links;
    graphLinks.length.should.eql(expectedLinks.length);
    graphLinks.forEach((graphLink) => {
      const expectedLink = find(expectedLinks, (link) => {
        return link.sourceUid === graphLink.source.uid && link.targetUid === graphLink.target.uid;
      });

      graphLink.weight.should.eql(expectedLink.weight);
      graphLink.className.should.eql(expectedLink.className);
    });
    instance.data.linkedByIndex.should.eql(expectedLinkedByIndex);

    wrapper.getDOMNode().getElementsByClassName('node').length.should.eql(expectedNodes.length);
    wrapper.getDOMNode().getElementsByClassName('link').length.should.eql(expectedLinks.length);
  });

  it('should return tooltip info when call graphTooltip', function () {
    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    const instance = wrapper.instance();
    instance.graphTooltip({ fname: 'Donnell Calhoun' }).should.eql('<span>Donnell Calhoun</span>');
  });

  it('should show connected nodes when click on node', function () {
    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        collideNodes={ true }
      />
    );

    const instance = wrapper.instance();

    instance.connectedNodes({ index: 12 });

    let graphNodes = wrapper.getDOMNode().getElementsByClassName('node');
    let hideGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '0.1');
    let visibleGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '1');
    hideGraphNodes.should.have.length(12);
    visibleGraphNodes.should.have.length(8);

    instance.connectedNodes({ index: 12 });

    hideGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '0.1');
    visibleGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '1');
    hideGraphNodes.should.have.length(0);
    visibleGraphNodes.should.have.length(20);
  });

  it('should resolves collisions between d and all other circles when call collide', function () {
    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();

    const graphNode1 = { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 5, x: 390, y: 405 };
    const graphNode2 = { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 7, x: 387, y: 418 };

    const graphNodes = [graphNode1, graphNode2];
    instance.data.nodes = graphNodes;

    instance.collide()(graphNode2);

    round(graphNode1.x, 2).should.eql(390.02);
    round(graphNode1.y, 2).should.eql(404.92);
    round(graphNode2.x, 2).should.eql(386.98);
    round(graphNode2.y, 2).should.eql(418.08);
  });

  it('should call drawGraph again when componentDidUpdate', function () {
    const smallCoaccusedData = [
      { officerId1: 2675, officerId2: 24157, incidentDate: '1990-01-09T00:00:00Z', accussedCount: 2 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
      { officerId1: 22861, officerId2: 30466, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-02-20T00:00:00Z', accussedCount: 2 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-07-06T00:00:00Z', accussedCount: 3 },
      { officerId1: 22861, officerId2: 30466, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 3 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 4 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1991-08-07T00:00:00Z', accussedCount: 3 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1992-03-08T00:00:00Z', accussedCount: 5 },
      { officerId1: 12176, officerId2: 28805, incidentDate: '1992-07-18T00:00:00Z', accussedCount: 2 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1993-02-15T00:00:00Z', accussedCount: 4 },
      { officerId1: 3663, officerId2: 21194, incidentDate: '1993-03-28T00:00:00Z', accussedCount: 2 },
    ];

    wrapper = mount(
      <SocialGraph
        officers={ officers }
        coaccusedData={ smallCoaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();
    instance.data.nodes.should.have.length(20);
    instance.data.links.should.have.length(6);

    wrapper.setProps({ coaccusedData: coaccusedData });
    instance.data.nodes.should.have.length(20);
    instance.data.links.should.have.length(37);
  });

  it('should not draw graph when officers is empty', function () {
    wrapper = mount(
      <SocialGraph
        officers={ [] }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();
    should(instance.data.nodes).be.undefined();
    should(instance.data.links).be.undefined();
  });
});
