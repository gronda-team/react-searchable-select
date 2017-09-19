import styled from 'styled-components';

const ScrollArea = styled.div`
	overflow-y: scroll;
	height: auto;
	max-height: 120px;
    background-color: #f3f7f9;

    &::-webkit-scrollbar {
	    width: 12px;
	}
	 
	&::-webkit-scrollbar-track {
	    backrgound-color: rgb(241, 241, 241); 
	}
	 
	&::-webkit-scrollbar-thumb {
	    background-color: rgb(193, 193, 193);
	}

`;

export default ScrollArea;
