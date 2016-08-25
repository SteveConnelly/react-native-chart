/* @flow */
'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
	xAxisContainer: {
		flexDirection: 'row',
		flex: 0,
		backgroundColor: 'transparent',
		justifyContent: 'space-between',
	},
	axisText: {
		flex: 1,
		backgroundColor: 'transparent',
	},
});

export default class XAxis extends Component {

	static propTypes = {
		axisColor: PropTypes.any.isRequired,
		axisLabelColor: PropTypes.any.isRequired,
		axisLineWidth: PropTypes.number.isRequired,
		data: PropTypes.arrayOf(PropTypes.array),
		showXAxisLabels: PropTypes.bool.isRequired,
		style: PropTypes.any,
		width: PropTypes.number.isRequired,
		align: PropTypes.string,
		labelFontSize: PropTypes.number.isRequired,
		xAxisTransform: PropTypes.func,
		horizontalGridStep: PropTypes.number,
		onXAxisLabelPress: PropTypes.func
	};
	static defaultProps = {
		align: 'center',
	};

	_handlePress = (e : Object, dataPoint : number, index : number) => {
		if (this.props.onXAxisLabelPress) {
			this.props.onXAxisLabelPress(e, dataPoint, index);
		}
	};

	render() {
		const data = this.props.data || [];
		let transform = (d) => d;
		if (this.props.xAxisTransform && typeof this.props.xAxisTransform === 'function') {
			transform = this.props.xAxisTransform;
		}
		return (
			<View
				style={[
					styles.xAxisContainer,
					{
						borderTopColor: this.props.axisColor,
						borderTopWidth: this.props.axisLineWidth,
					},
					this.props.style,
				]}
			>
			{(() => {
				if (!this.props.showXAxisLabels) return null;
				return data.map((d, i) => {
					let stepsBetweenVerticalLines = this.props.horizontalGridStep ? Math.round((data.length) / this.props.horizontalGridStep + 1) : 1;
					if (stepsBetweenVerticalLines < 1) stepsBetweenVerticalLines = 1;
					if (i % stepsBetweenVerticalLines !== 0) return null;
					const item = transform(d[0]);
					if (typeof item !== 'number' && !item) return null;
					return (
						<TouchableWithoutFeedback
							key={i}
							onPress={(e) => this._handlePress(e, d, i)}
						>
							<View>
								<Text
									key={i}
									style={[
										styles.axisText,
										{
											textAlign: this.props.align,
											color: this.props.axisLabelColor,
											fontSize: this.props.labelFontSize,
										},
									]}
								>{item}</Text>
							</View>
						</TouchableWithoutFeedback>
				);
				});
			})()}
			</View>
		);
	}
}
