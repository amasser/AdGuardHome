import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Trans, withNamespaces } from 'react-i18next';
import flow from 'lodash/flow';

import { ip, renderField, renderRadioField, required, toNumber } from '../../../helpers/form';
import { BLOCKING_MODES } from '../../../helpers/constants';

class Form extends Component {
    state = { isDisplayed: false, ipAddress: '' };

    showInput = () => this.setState({ isDisplayed: true, ipAddress: this.state.ipAddress });

    hideInput = () => {
        this.setState({ isDisplayed: false, ipAddress: '' });
    };

    getFields = processing => Object.values(BLOCKING_MODES).map(mode => (
        <Field
            key={mode}
            name="mode"
            type="radio"
            component={renderRadioField}
            value={mode}
            placeholder={mode === BLOCKING_MODES.nxdomain ? mode.toUpperCase() :
                mode.slice(0, 1).toUpperCase() + mode.slice(1)}
            disabled={processing}
            onChange={mode === BLOCKING_MODES.custom_ip ? this.showInput : this.hideInput}
        />
    ));

    render() {
        const {
            handleSubmit, submitting, invalid, processing, t,
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <label className="form__label">
                    <Trans>blocking_mode</Trans>
                </label>
                <div className="form__group form__group--settings">
                    <div className="custom-controls-stacked">
                        {this.getFields(processing, t)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form__group form__group--settings">
                            <label><Trans>rate_limit</Trans></label>
                            <Field
                                name="rate_limit"
                                component={renderField}
                                className="form-control"
                                type="number"
                                normalize={toNumber}
                            />
                        </div>
                    </div>
                    <div className="col">
                        {this.state.isDisplayed &&
                        <div className="form__group form__group--settings">
                            <label><Trans>ip_address</Trans></label>
                            <Field
                                name="ip_address"
                                component={renderField}
                                className="form-control"
                                value={this.state.ipAddress}
                                placeholder={this.state.ipAddress}
                                onChange={e => this.setState({ ipAddress: e.target.value })}
                                validate={[ip, required]}
                            />
                        </div>}
                    </div>
                </div>
                <div className="mt-5">
                    <button
                        type="submit"
                        className="btn btn-success btn-standard btn-large"
                        disabled={submitting || invalid || processing}
                    >
                        <Trans>save_btn</Trans>
                    </button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    mode: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    processing: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

export default flow([
    withNamespaces(),
    reduxForm({
        form: 'blockingModeForm',
    }),
])(Form);
