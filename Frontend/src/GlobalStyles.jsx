import styled from "styled-components";

export const GlobalStyles = styled.div`
    :root{
  --primary : ${props => props?.primaryColor || "#e74c3cab"}
}
`