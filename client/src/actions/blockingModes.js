import { createAction } from 'redux-actions';

import apiClient from '../api/Api';
import { addErrorToast, addSuccessToast } from './index';

export const getBlockingModesConfigRequest = createAction('GET_BLOCKING_MODES_CONFIG_REQUEST');
export const getBlockingModesConfigFailure = createAction('GET_BLOCKING_MODES_CONFIG_FAILURE');
export const getBlockingModesConfigSuccess = createAction('GET_BLOCKING_MODES_CONFIG_SUCCESS');

export const getBlockingModesConfig = () => async (dispatch) => {
    dispatch(getBlockingModesConfigRequest());
    try {
        const data = await apiClient.getQueryLogInfo();
        dispatch(getBlockingModesConfigSuccess(data));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(getBlockingModesConfigFailure());
    }
};

export const setBlockingModesConfigRequest = createAction('SET_BLOCKING_MODES_CONFIG_REQUEST');
export const setBlockingModesConfigFailure = createAction('SET_BLOCKING_MODES_CONFIG_FAILURE');
export const setBlockingModesConfigSuccess = createAction('SET_BLOCKING_MODES_CONFIG_SUCCESS');

export const setBlockingModesConfig = config => async (dispatch) => {
    dispatch(setBlockingModesConfigRequest());
    try {
        await apiClient.setQueryLogConfig(config);
        dispatch(addSuccessToast('config_successfully_saved'));
        dispatch(setBlockingModesConfigSuccess(config));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(setBlockingModesConfigFailure());
    }
};
