import React from "react";
import Portlet from "../components/elements/portlet/Portlet";
import MultistepForm from "../components/elements/multistep-form/MultistepForm";
import MultistepMarker from "../components/elements/multistep-form/MultistepMarker";
import DataStep from "../components/business/dataset-steps/DataStep";
import FeaturesAndProtectedCharacteristicsStep
    from "../components/business/dataset-steps/FeaturesAndProtectedCharacteristicsStep";
import BiasMetricStep from "../components/business/dataset-steps/BiasMetricStep";
import OverviewStep from "../components/business/dataset-steps/OverviewStep";
import {useNavigate} from "react-router-dom";

const DatasetPage = () => {
    const navigate = useNavigate();

    const stepMarkers = () => {
        const markers = [];
        let index = 1;
        markers.push(<MultistepMarker step={index++} title="Data"/>);
        markers.push(<MultistepMarker step={index++} title="Features & Protected Characteristics"/>);
        markers.push(<MultistepMarker step={index++} title="Bias Metric"/>);
        markers.push(<MultistepMarker step={index++} title="Overview"/>);
        return markers;
    };

    const multiSteps = () => {
        const steps = [];
        let index =1;
        steps.push(<DataStep key={index++}/>);
        steps.push(<FeaturesAndProtectedCharacteristicsStep key={index++}/>);
        steps.push(<BiasMetricStep key={index++}/>);
        steps.push(<OverviewStep key={index++}/>);
        return steps;
    };

    const handleSubmitStep1 = (event: any) => {
        event.preventDefault();
        return Promise.resolve(() => {
            return true;
        });
    };

    const handleSubmitStep2 = (event: any) => {
        event.preventDefault();
        return Promise.resolve(() => {
            return true;
        });
    };

    const handleSubmitStep3 = (event: any) => {
        event.preventDefault();
        return Promise.resolve(() => {
            return true;
        });
    };

    const handleSubmitStep4 = (event: any) => {
        event.preventDefault();
        navigate("/runs");
        return Promise.resolve(() => {
            return true;
        });
    };

    const stepActions = () => {
        const actions = [];
        actions.push(handleSubmitStep1);
        actions.push(handleSubmitStep2);
        actions.push(handleSubmitStep3);
        actions.push(handleSubmitStep4);
        return actions;
    };

    return(<>
        <div>
            <Portlet>
                <MultistepForm
                    markerSteps={stepMarkers()}
                    steps={multiSteps()}
                    stepActions={stepActions()}
                />
            </Portlet>
        </div>
    </>);
};
export default DatasetPage;