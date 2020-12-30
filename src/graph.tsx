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
            <div className="Graph" style={{ height: 400, width: 600, backgroundColor: "white" }}>

                <ResponsiveBar
                    data={this.props.chart}
                    keys={[ 'probability' ]}
                    indexBy="digit"
                    margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
                    padding={0.3}
                    valueScale={{ type: 'linear', min: 0, max: 1 }}
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
                        legendOffset: -40,
                        tickValues: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
                    }}
                    enableLabel={false}
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