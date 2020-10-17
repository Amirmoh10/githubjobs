import React, { useContext } from "react";
import styled from "styled-components";
import DispatchContext from "../../dispatchContext";
import { ACTION } from "../../App";

const DefualtButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #b7bcce;
  color: #b7bcce;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 12px;
  background-color: #f6f7fb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.37);
  &:focus {
    background-color: #1e86ff;
    outline: none;
    color: white;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
function Page() {
  const pageDispatch = useContext(DispatchContext);

  const onClick = (event) => {
    pageDispatch({
      type: ACTION.CLICK_PAGE,
      value: parseInt(event.target.value) + 1,
    });
  };

  return (
    <ButtonDiv>
      <DefualtButton onClick={onClick} value="1">
        1
      </DefualtButton>
      <DefualtButton onClick={onClick} value="2">
        2
      </DefualtButton>
    </ButtonDiv>
  );
}

export default Page;
