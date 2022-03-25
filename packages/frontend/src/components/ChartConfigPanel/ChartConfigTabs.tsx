import { InputGroup, Tab, Tabs } from '@blueprintjs/core';
import {
    fieldId,
    getDefaultSeriesColor,
    getDimensions,
    getItemId,
    getItemLabel,
    getMetrics,
    getSeriesId,
    isField,
    Metric,
    TableCalculation,
} from 'common';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useVisualizationContext } from '../LightdashVisualization/VisualizationProvider';
import {
    FieldsGrid,
    GridLabel,
    InputWrapper,
    Wrapper,
} from './ChartConfigPanel.styles';
import FieldLayoutOptions from './FieldLayoutOptions';
import BasicSeriesConfiguration from './Series/BasicSeriesConfiguration';
import GroupedSeriesConfiguration from './Series/GroupedSeriesConfiguration';

const ChartConfigTabs: FC = () => {
    const {
        explore,
        resultsData,
        cartesianConfig: {
            dirtyLayout,
            dirtyEchartsConfig,
            setXField,
            addSingleSeries,
            removeSingleSeries,
            updateSingleSeries,
            updateAllGroupedSeries,
            setXAxisName,
            setYAxisName,
        },
        pivotDimensions,
        setPivotDimensions,
    } = useVisualizationContext();
    const yFieldsKeys = dirtyLayout?.yField || [];
    const pivotDimension = pivotDimensions?.[0];

    const [tab, setTab] = useState<string | number>('layout');

    const dimensionsInMetricQuery = explore
        ? getDimensions(explore).filter((field) =>
              resultsData?.metricQuery.dimensions.includes(fieldId(field)),
          )
        : [];

    const metricsAndTableCalculations: Array<Metric | TableCalculation> =
        explore
            ? [
                  ...getMetrics(explore),
                  ...(resultsData?.metricQuery.tableCalculations || []),
              ].filter((item) => {
                  if (isField(item)) {
                      return resultsData?.metricQuery.metrics.includes(
                          fieldId(item),
                      );
                  }
                  return true;
              })
            : [];

    const items = [...dimensionsInMetricQuery, ...metricsAndTableCalculations];

    const xAxisField = items.find(
        (item) => getItemId(item) === dirtyLayout?.xField,
    );

    const firstYAxisField = items.find(
        (item) => getItemId(item) === dirtyLayout?.yField?.[0],
    );

    const fallbackSeriesColours = useMemo(() => {
        return (dirtyEchartsConfig?.series || [])
            .filter(({ color }) => !color)
            .reduce<Record<string, string>>(
                (sum, series, index) => ({
                    ...sum,
                    [getSeriesId(series)]: getDefaultSeriesColor(index),
                }),
                {},
            );
    }, [dirtyEchartsConfig]);

    const getSeriesColor = useCallback(
        (seriesId: string) => {
            return fallbackSeriesColours[seriesId];
        },
        [fallbackSeriesColours],
    );

    const selectedAxisInSeries = Array.from(
        new Set(
            dirtyEchartsConfig?.series?.map(({ yAxisIndex }) => yAxisIndex),
        ),
    );
    const isAxisTheSameForAllSeries: boolean =
        selectedAxisInSeries.length === 1;
    const selectedAxisIndex = selectedAxisInSeries[0] || 0;

    const fallbackAxisName: string | undefined =
        dirtyEchartsConfig?.series && dirtyEchartsConfig?.series.length === 1
            ? dirtyEchartsConfig.series[0].name ||
              (firstYAxisField && getItemLabel(firstYAxisField))
            : undefined;

    return (
        <Wrapper>
            <Tabs
                onChange={setTab}
                selectedTabId={tab}
                renderActiveTabPanelOnly
            >
                <Tab
                    id="layout"
                    title="Layout"
                    panel={
                        <FieldsGrid>
                            <GridLabel>Field</GridLabel>
                            <GridLabel>Axis</GridLabel>
                            {items.map((item) => {
                                const itemId = getItemId(item);
                                return (
                                    <FieldLayoutOptions
                                        key={getItemId(item)}
                                        item={item}
                                        isXActive={
                                            xAxisField &&
                                            getItemId(xAxisField) === itemId
                                        }
                                        isYActive={yFieldsKeys.includes(itemId)}
                                        isGroupActive={
                                            !!pivotDimension &&
                                            pivotDimension === itemId
                                        }
                                        onXClick={(isActive) =>
                                            setXField(
                                                isActive ? itemId : undefined,
                                            )
                                        }
                                        onYClick={(isActive) => {
                                            if (isActive) {
                                                addSingleSeries(itemId);
                                            } else {
                                                const index =
                                                    yFieldsKeys.findIndex(
                                                        (yField) =>
                                                            yField === itemId,
                                                    );
                                                if (index !== undefined) {
                                                    removeSingleSeries(index);
                                                }
                                            }
                                        }}
                                        onGroupClick={(isActive) =>
                                            isActive
                                                ? setPivotDimensions([itemId])
                                                : setPivotDimensions(undefined)
                                        }
                                    />
                                );
                            })}
                        </FieldsGrid>
                    }
                />
                <Tab
                    id="series"
                    title="Series"
                    panel={
                        pivotDimension ? (
                            <GroupedSeriesConfiguration
                                items={items}
                                series={dirtyEchartsConfig?.series}
                                getSeriesColor={getSeriesColor}
                                updateSingleSeries={updateSingleSeries}
                                updateAllGroupedSeries={updateAllGroupedSeries}
                            />
                        ) : (
                            <BasicSeriesConfiguration
                                items={items}
                                series={dirtyEchartsConfig?.series}
                                getSeriesColor={getSeriesColor}
                                updateSingleSeries={updateSingleSeries}
                            />
                        )
                    }
                />
                <Tab
                    id="axes"
                    title="Axes"
                    panel={
                        <>
                            <InputWrapper label="X-axis label">
                                <InputGroup
                                    placeholder={
                                        xAxisField
                                            ? getItemLabel(xAxisField)
                                            : 'Enter X-axis label'
                                    }
                                    defaultValue={
                                        dirtyEchartsConfig?.xAxis?.[0].name
                                    }
                                    onBlur={(e) =>
                                        setXAxisName(e.currentTarget.value)
                                    }
                                />
                            </InputWrapper>
                            <InputWrapper label="Y-axis label (left)">
                                <InputGroup
                                    placeholder={
                                        !isAxisTheSameForAllSeries ||
                                        selectedAxisIndex === 0
                                            ? fallbackAxisName
                                            : 'Enter left Y-axis label'
                                    }
                                    defaultValue={
                                        dirtyEchartsConfig?.yAxis?.[0]?.name
                                    }
                                    onBlur={(e) =>
                                        setYAxisName(0, e.currentTarget.value)
                                    }
                                />
                            </InputWrapper>
                            <InputWrapper label="Y-axis label (right)">
                                <InputGroup
                                    placeholder={
                                        isAxisTheSameForAllSeries &&
                                        selectedAxisIndex === 1
                                            ? fallbackAxisName
                                            : 'Enter right Y-axis label'
                                    }
                                    defaultValue={
                                        dirtyEchartsConfig?.yAxis?.[1]?.name
                                    }
                                    onBlur={(e) =>
                                        setYAxisName(1, e.currentTarget.value)
                                    }
                                />
                            </InputWrapper>
                        </>
                    }
                />
            </Tabs>
        </Wrapper>
    );
};

export default ChartConfigTabs;
