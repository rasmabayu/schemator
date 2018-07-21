import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import TableInput from "../TableInput";
import TableBox from "../TableBox";

describe("TableBox", () => {
  const setup = propOverrides => {
    const props = {
      position: { x: 32, y: 32 },
      name: "User",
      fields: [
        {
          id: "1",
          name: "fullname",
          type: "STRING"
        },
        {
          id: "2",
          name: "username",
          type: "VARCHAR"
        }
      ],
      onClickAddField: jest.fn(),
      onClickRemoveField: jest.fn(),
      onChangeFieldName: jest.fn(),
      onChangeFieldType: jest.fn(),
      onChangeName: jest.fn(),
      onChangeOptions: jest.fn(),
      onMouseDown: jest.fn(),
      onMouseMove: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
      onContextMenu: jest.fn(),
      ...propOverrides
    };

    const wrapper = shallow(<TableBox {...props} />);

    return {
      wrapper,
      props
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should calls 'onMouseDown' while mouse down", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("mouseDown");

    expect(props.onMouseDown).toBeCalled();
  });

  it("should calls 'onMouseMove' while mouse move", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("mouseMove");

    expect(props.onMouseMove).toBeCalled();
  });

  it("should calls 'onMouseEnter' while mouse enter", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("mouseEnter");

    expect(props.onMouseEnter).toBeCalled();
  });

  it("should calls 'onMouseLeave' while mouse leave", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("mouseLeave");

    expect(props.onMouseLeave).toBeCalled();
  });

  it("should calls 'onContextMenu' while mouse right button clicked", () => {
    const { wrapper, props } = setup();

    wrapper.simulate("contextmenu");

    expect(props.onContextMenu).toBeCalled();
  });

  it("should calls 'onChangeName' while TableInput name changed", () => {
    const { wrapper, props } = setup();
    const fieldID = "1";
    const event = {
      target: {
        value: "name"
      }
    };

    wrapper
      .find(TableInput)
      .at(0)
      .props()
      .onChangeName(event);

    expect(props.onChangeFieldName).toBeCalledWith(event, fieldID);
  });

  it("should calls 'onChangeType' while TableInput type changed", () => {
    const { wrapper, props } = setup();
    const fieldID = "1";
    const event = {
      target: {
        value: "INT"
      }
    };

    wrapper
      .find(TableInput)
      .at(0)
      .props()
      .onChangeType(event);

    expect(props.onChangeFieldType).toBeCalledWith(event, fieldID);
  });

  it("should calls 'onClickRemove' while TableInput remove button clicked", () => {
    const { wrapper, props } = setup();
    const fieldID = "1";

    wrapper
      .find(TableInput)
      .at(0)
      .props()
      .onClickRemove();

    expect(props.onClickRemoveField).toBeCalledWith(fieldID);
  });
});
