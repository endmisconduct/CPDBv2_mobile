import { crPinboardsMenuSelector } from 'selectors/complaint-page/pinboards-menu';

describe('crPinboardsMenuSelector', function () {
  it('should return pinboards menu correctly', function () {
    const state = {
      headers: {
        pinboards: [
          {
            id: '73fje',
            title: 'Pinboard 73fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [],
            'crids': [],
            'trr_ids': [],
          },
          {
            id: '84fje',
            title: 'Pinboard 84fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [],
            'crids': ['864'],
            'trr_ids': [],
          },
          {
            id: '92fje',
            title: 'Pinboard 92fje',
            'created_at': '2019-01-09T06:00:01-06:00',
            'officer_ids': [],
            'crids': [],
            'trr_ids': [],
          },
        ],
      },
      pinboardPage: {
        pinboard: {
          id: '73fje',
          'officer_ids': [],
          'crids': ['864'],
          'trr_ids': [],
        },
      },
    };

    const props = { match: { params: { complaintId: '864' } } };
    crPinboardsMenuSelector(state, props).should.eql([
      {
        id: '73fje',
        title: 'Pinboard 73fje',
        createdAt: 'Jan 09, 2019',
        isPinned: true,
        isCurrent: true,
      },
      {
        id: '84fje',
        title: 'Pinboard 84fje',
        createdAt: 'Jan 09, 2019',
        isPinned: true,
        isCurrent: false,
      },
      {
        id: '92fje',
        title: 'Pinboard 92fje',
        createdAt: 'Jan 09, 2019',
        isPinned: false,
        isCurrent: false,
      },
    ]);
  });
});
