import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import Card from '../../ui/Card';
import Form from './Form';

const BlockingModeConfig = (props) => {
    const handleFormSubmit = (values) => {
        const { t, mode: prevMode } = props;
        const { mode } = values;

        if (mode !== prevMode) {
            if (window.confirm(t('blocking_mode_confirm'))) {
                props.setBlockingModesConfig(values);
            }
        } else {
            props.setBlockingModesConfig(values);
        }
    };

    const {
        t, mode, processing,
    } = props;

    return (
        <Card
            title={t('blocking_mode_configuration')}
            bodyType="card-body box-body--settings"
            id="logs-config"
        >
            <div className="form">
                <Form
                    mode={mode}
                    initialValues={{ mode }}
                    onSubmit={handleFormSubmit}
                    processing={processing}
                />
            </div>
        </Card>
    );
};

BlockingModeConfig.propTypes = {
    mode: PropTypes.string.isRequired,
    processing: PropTypes.bool.isRequired,
    setBlockingModesConfig: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default withNamespaces()(BlockingModeConfig);
