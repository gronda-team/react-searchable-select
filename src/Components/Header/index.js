import React from 'react';
import styled from 'styled-components';
import logo from '../../../public/gronda_logo_side.png';

const styles = {
	wrapper: {
		height: 150,
		background: "white",
		margin: "0px auto",
		color: "#102030",
		marginBottom: 100,
		fontWeight: "bold",
		display: "flex",
		justifyContent: "center",
		verticalAlign: "middle"
	}
}

const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

class Header extends React.Component {
	render(){
		return (
			<div style={styles.wrapper}>
				<ImageWrapper>
					<img src={logo} alt="Gronda" />
				</ImageWrapper>
			</div>
			)
	}
}

export default Header;