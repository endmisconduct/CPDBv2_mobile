import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { lorem, random } from 'faker';

import withPinnable from 'components/common/with-pinnable';
import constants from 'constants';


describe('ItemPinButton component', function () {
  const firstCRID = lorem.word();
  const secondCRID = lorem.word();
  const officerID = random.number({ min: 10, max: 1000 });

  function TestComponent(props) {
    return <div className='test--classname' />;
  }

  const TestComponentWithPinnable = withPinnable(TestComponent);

  it('should render children', function () {
    const wrapper = mount(
      <TestComponentWithPinnable
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
      />
    );

    wrapper.find('.test--classname').exists().should.be.true();
  });

  it('should handle on pin button click', function () {
    const addOrRemoveItemInPinboardStub = sinon.stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: officerID,
      isPinned: false,
    }).should.be.true();
  });

  it('should handle on pin button with all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = sinon.stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: constants.PINBOARD_PAGE.CR, id: firstCRID, isPinned: true },
          { type: constants.PINBOARD_PAGE.CR, id: secondCRID, isPinned: true },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: constants.PINBOARD_PAGE.CR,
      id: firstCRID,
      isPinned: true,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: constants.PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: true,
    });
  });

  it('should handle on pin button with all items are not pinned', function () {
    const addOrRemoveItemInPinboardStub = sinon.stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: constants.PINBOARD_PAGE.CR, id: firstCRID, isPinned: false },
          { type: constants.PINBOARD_PAGE.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: constants.PINBOARD_PAGE.CR,
      id: firstCRID,
      isPinned: false,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: constants.PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: false,
    });
  });

  it('should handle on pin button with not all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = sinon.stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: constants.PINBOARD_PAGE.CR, id: firstCRID, isPinned: true },
          { type: constants.PINBOARD_PAGE.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledOnce();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: constants.PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: false,
    });
  });
});
