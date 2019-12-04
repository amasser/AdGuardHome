import { handleActions } from 'redux-actions';

import * as actions from '../actions/blockingModes';

const blockingModes = handleActions(
    {
        [actions.getBlockingModesConfigRequest]: state => ({ ...state, processingGetConfig: true }),
        [actions.getBlockingModesConfigFailure]: state =>
            ({ ...state, processingGetConfig: false }),
        [actions.getBlockingModesConfigSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
            processingGetConfig: false,
        }),

        [actions.setBlockingModesConfigRequest]: state => ({ ...state, processingSetConfig: true }),
        [actions.setBlockingModesConfigFailure]: state =>
            ({ ...state, processingSetConfig: false }),
        [actions.setBlockingModesConfigSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
            processingSetConfig: false,
        }),
    },
    {
        processingGetConfig: false,
        processingSetConfig: false,
        mode: 'nxdomain',
    },
);

export default blockingModes;
