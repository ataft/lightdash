import {
    ApiQueryResults,
    ChartConfig,
    Explore,
    getPivotedFieldKey,
    isCompleteLayout,
} from 'common';
import { useMemo } from 'react';

export const getPivotedData = (
    rows: ApiQueryResults['rows'],
    xAxis: string,
    yAxis: string[],
    pivotKey: string,
): ApiQueryResults['rows'] => {
    return Object.values(
        rows.reduce((acc, row) => {
            acc[row[xAxis]] = acc[row[xAxis]] || {
                [xAxis]: row[xAxis],
            };
            yAxis.forEach((metricKey) => {
                acc[row[xAxis]][getPivotedFieldKey(metricKey, row[pivotKey])] =
                    row[metricKey];
            });
            return acc;
        }, {}),
    );
};

const usePlottedData = (
    explore: Explore | undefined,
    chartConfig: ChartConfig['config'],
    resultsData: ApiQueryResults | undefined,
    pivotDimensions: string[] | undefined,
): ApiQueryResults['rows'] => {
    return useMemo(() => {
        if (!explore || !resultsData || !chartConfig) {
            return [];
        }
        const pivotDimension = pivotDimensions?.[0];
        if (pivotDimension && isCompleteLayout(chartConfig.layout)) {
            return getPivotedData(
                resultsData.rows,
                chartConfig.layout.xField,
                chartConfig.layout.yField,
                pivotDimension,
            );
        }
        return resultsData.rows;
    }, [explore, resultsData, chartConfig, pivotDimensions]);
};

export default usePlottedData;
