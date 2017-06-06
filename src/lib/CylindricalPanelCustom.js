import React from 'react';
import {
	asset,
	View,
	Cylinder,
	Image
} from 'react-vr';
import Button from './Button';
import LotsOfGreetings from './LotsOfGreetings';
import CylindricalPanel from 'CylindricalPanel';

export default class CylindricalPanelCustom extends React.Component {
	render() {
		let bufferWidthPx = 2000;
		let bufferHeightPx = 720;
		let numberOfPxForACompleteTurn = 2000;
		// let distanceFromTheViewer = 20;

		return (
			<CylindricalPanel
				layer={{
					width: bufferWidthPx,
					height: bufferHeightPx,
					density: numberOfPxForACompleteTurn,
					// radius: distanceFromTheViewer
				}}
				style={{
					position: 'absolute'
				}}>
				<View
					style={{
						opacity: 1,
						width: 2000,
						height: 720,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{/*<LotsOfGreetings />*/}
					{/*<Image*/}
						{/*style={{*/}
							{/*borderRadius: 20,*/}
							{/*backgroundColor: 'red',*/}
							{/*borderWidth: 10,*/}
							{/*width: 450,*/}
							{/*height: 225,*/}
						{/*}}*/}
						{/*// source={{*/}
						{/*// 	uri: 'https://facebook.github.io/react/img/logo_og.png',*/}
						{/*// }}*/}
						{/*source={asset('storm_960_720.jpg')}*/}
					{/*/>*/}
					<Button x={-200} y={20} z={0}/>
					<Button x={-200} y={0} z={0}/>
					<Cylinder
						radiusTop={10}
						radiusBottom={10}
						dimHeight={500}
						segments={12}
						texture={asset('dna_black.png')}
						lit={true}
						wireframe={false}
						style={{
							// position: 'absolute',
							transform: [
								{rotateX : 0},
								{rotateY : -85},
								{rotateZ : 30},
								{translate: [-200, 50, 0]},
								{scale : 1.0 }
							],
						}}
					/>
					<Cylinder
						radiusTop={10}
						radiusBottom={10}
						dimHeight={500}
						segments={12}
						texture={asset('dna_black.png')}
						lit={false}
						wireframe={false}
						style={{
							// position: 'relative',
							transform: [
								{rotateX : 0},
								{rotateY : 85}, // vert rotate
								{rotateZ : -30}, // tip away
								{translate: [0, 50, 100]}, // horiz shift, vert shift, ?
								{scale : 1.0 }
							],
							layoutOrigin: [0.5, 0.5]
						}}
					/>
				</View>
			</CylindricalPanel>
		);
	}
}