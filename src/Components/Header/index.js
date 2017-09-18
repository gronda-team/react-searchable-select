import React from 'react';

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

class Header extends React.Component {
	render(){
		return (
			<div style={styles.wrapper}>
				Gronda
				<img src="../../../public/gronda_logo_side.png" />
			</div>
			)
	}
}

export default Header;