import styled from 'styled-components';

const Tag = styled.button`
	background-color: rgba(0, 150, 110, 0.8);
	color: #FFF;
	border: none;
    border-radius: 3px;
    margin: 1px;
    cursor: pointer;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
    padding: 5px;

    &:after {
    	content: "x";
    	padding: 0px 5px;
    }
`;

export default Tag;