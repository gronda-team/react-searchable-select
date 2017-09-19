import styled from 'styled-components';

const Input = styled.input`
	height: 25px;
	margin-top: 10px;
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
    padding: 5px 10px;
    font-size: 16px;
	
	&:focus {
		outline-width: 0;
	}
`;

export default Input;
