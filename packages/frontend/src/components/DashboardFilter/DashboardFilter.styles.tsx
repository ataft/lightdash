import { AnchorButton, Colors } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import styled from 'styled-components';

export const TriggerWrapper = styled(Popover2)`
    width: fit-content;
    margin-bottom: 0.5em;
`;

export const FilterTrigger = styled(AnchorButton)`
    color: ${Colors.BLUE3} !important;
    & span[icon='filter-list'] {
        & svg path {
            fill: ${Colors.BLUE3} !important;
        }
    }

    :hover {
        background: transparent !important;

        & span {
            text-decoration: underline;
        }
    }
    :focus,
    :active {
        outline: none;
        & span {
            text-decoration: underline;
        }
    }
`;

export const DashboardFilterWrapper = styled.div`
    display: flex;
    align-items: baseline;
`;