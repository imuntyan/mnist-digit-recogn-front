import React, {useRef, useEffect, createRef} from 'react';
import { ResponsiveBar } from '@nivo/bar';



class Graph extends React.Component {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        console.log(this.props.chart)
        return (
            <div className="Graph" style={{ height: 400, width: 600 }}>
                <ResponsiveBar
                    data={this.props.chart}
                    keys={[ 'probability' ]}
                    indexBy="digit"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'digits',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'probability',
                        legendPosition: 'middle',
                        legendOffset: 40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
            )
    }
}

export default Graph;