import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";

interface StepWrapperProps {
    activeStep: number;
}
const steps = ['Інформація про пісню', 'Завантажте обкладинку', 'Завантажте саму пісню']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '4.3rem 0 ', height: '17rem'}}>
                {/* <Card style={{width: 600}}> */}
                <Card style={{}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
