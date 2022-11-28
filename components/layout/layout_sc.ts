import styled from "styled-components";

//c34a6d pink
//e8c4de light_pink
//dbb109 yellow

interface Props {
  width?: string;
  height?: string;
}

export const Body = styled.div`
  min-height: calc(150vh + 0px) !important;
  min-width: fit-content !important;
  padding: 4rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #c34a6d;
`;

export const MainWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  a {
    color: #a333c8;
  }
`;

export const Spacer = styled.div<Props>`
  height: ${(props) => props.height || "2rem"};
  width: ${(props) => props.width || "100%"};
`;

interface iModuleTitle {
  fontSize?: string;
}

export const ModuleTitle = styled.div<iModuleTitle>`
  width: 100%;
  color: #4c2d62;
  font-size: ${(props) => props.fontSize || "3rem"};
  font-weight: bold;
  text-aligement: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Code = styled.pre`
  background: #ebebeb;
  width: 100%;
  // padding: 10;
  border: 1px solid grey;
  margin: 0px;
  // marginbottom: 10;
`;
