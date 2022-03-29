import { Colors, FormGroup } from '@blueprintjs/core';
import styled from 'styled-components';

export const InputWrapper = styled(FormGroup)`
    & label.bp3-label {
        font-weight: 500;
        display: inline-flex;
        gap: 0.214em;
    }
`;

export const GroupSeriesBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const GroupSeriesWrapper = styled.div`
    padding: 10px;
    background: ${Colors.LIGHT_GRAY5};
`;

export const GroupSeriesInputs = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
    justify-content: space-between;
`;

export const SeriesBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const SeriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const SeriesTitle = styled.p`
    color: ${Colors.GRAY1};
    font-weight: bold;
    margin-bottom: 10px;
`;

export const SeriesMainInputs = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
`;

export const SeriesExtraInputs = styled.div`
    display: flex;
    flex: 1;
    gap: 10px;
    margin-top: 10px;
    justify-content: space-between;
`;

export const SeriesExtraInputWrapper = styled(FormGroup)`
    & label.bp3-label {
        font-weight: 500;
        display: inline-flex;
        gap: 0.214em;
        color: ${Colors.GRAY3};
        font-size: 12px;
    }
`;

export const Wrapper = styled.div`
    max-width: 28.571em;
    min-width: 25em;
    padding: 1.429em;
`;

export const ColorButton = styled.button`
    height: 30px;
    width: 30px;
    cursor: pointer;
    border: none;
    background-color: transparent;

    box-sizing: border-box;
    box-shadow: 0 0 0 0 rgb(19 124 189 / 0%), 0 0 0 0 rgb(19 124 189 / 0%),
        inset 0 0 0 1px rgb(16 22 26 / 15%), inset 0 1px 1px rgb(16 22 26 / 20%);
    border-radius: 3px;
    padding: 4px;
`;

export const ColorButtonInner = styled.div`
    height: 100%;
    width: 100%;
`;