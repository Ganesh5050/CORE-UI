import { useState } from 'react';
import ComponentDetail from './ComponentDetail';
import Stepper, { Step } from '../components/effects/Stepper';

const StepperPage = () => {
  const [backButtonText, setBackButtonText] = useState('Previous');
  const [nextButtonText, setNextButtonText] = useState('Next');
  const [disableStepIndicators, setDisableStepIndicators] = useState(false);
  const [name, setName] = useState('');

  const preview = (
    <div className="h-[600px] w-full relative bg-[#060010] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Stepper
          initialStep={1}
          backButtonText={backButtonText}
          nextButtonText={nextButtonText}
          disableStepIndicators={disableStepIndicators}
        >
          <Step>
            <div className="text-white">
              <h2 className="text-xl font-bold mb-2">Welcome to the React Bits stepper!</h2>
              <p className="text-gray-400">Check out the next step!</p>
            </div>
          </Step>
          <Step>
            <div className="text-white">
              <h2 className="text-xl font-bold mb-2">Step 2</h2>
              <img
                style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '15px', marginTop: '1em' }}
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Cat"
              />
              <p className="text-gray-400 mt-2">Custom step content!</p>
            </div>
          </Step>
          <Step>
            <div className="text-white">
              <h2 className="text-xl font-bold mb-2">How about an input?</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name?"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mt-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </Step>
          <Step>
            <div className="text-white">
              <h2 className="text-xl font-bold mb-2">Final Step</h2>
              <p className="text-gray-400">You made it, {name || 'friend'}!</p>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );

  const customization = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Back Button Text</label>
          <input
            type="text"
            value={backButtonText}
            onChange={(e) => setBackButtonText(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Next Button Text</label>
          <input
            type="text"
            value={nextButtonText}
            onChange={(e) => setNextButtonText(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <label className="text-sm font-medium text-gray-300">Disable Step Indicators</label>
          <input
            type="checkbox"
            checked={disableStepIndicators}
            onChange={(e) => setDisableStepIndicators(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const usageCode = `import Stepper, { Step } from './Stepper';

<Stepper
  initialStep={1}
  backButtonText="${backButtonText}"
  nextButtonText="${nextButtonText}"
  disableStepIndicators={${disableStepIndicators}}
>
  <Step>
    <h2>Step 1</h2>
  </Step>
  <Step>
    <h2>Step 2</h2>
  </Step>
  <Step>
    <h2>Step 3</h2>
  </Step>
</Stepper>`;

  const codeExample = `import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    backButtonText?: string;
    nextButtonText?: string;
    disableStepIndicators?: boolean;
    renderStepIndicator?: (props: {
        step: number;
        currentStep: number;
        onStepClick: (clicked: number) => void;
    }) => ReactNode;
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = '',
    stepContainerClassName = '',
    contentClassName = '',
    footerClassName = '',
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = 'Back',
    nextButtonText = 'Continue',
    disableStepIndicators = false,
    renderStepIndicator,
    ...rest
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div
            className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"
            {...rest}
        >
            <div
                className={\`mx-auto w-full max-w-md rounded-4xl shadow-xl \${stepCircleContainerClassName}\`}
                style={{ border: '1px solid #222' }}
            >
                <div className={\`\${stepContainerClassName} flex w-full items-center p-8\`}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={clicked => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={\`space-y-2 px-8 \${contentClassName}\`}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>

                {!isCompleted && (
                    <div className={\`px-8 pb-8 \${footerClassName}\`}>
                        <div className={\`mt-10 flex \${currentStep !== 1 ? 'justify-between' : 'justify-end'}\`}>
                            {currentStep !== 1 && (
                                <button
                                    onClick={handleBack}
                                    className={\`duration-350 rounded px-2 py-1 transition \${currentStep === 1
                                            ? 'pointer-events-none opacity-50 text-neutral-400'
                                            : 'text-neutral-400 hover:text-neutral-700'
                                        }\`}
                                    {...backButtonProps}
                                >
                                    {backButtonText}
                                </button>
                            )}
                            <button
                                onClick={isLastStep ? handleComplete : handleNext}
                                className="duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700"
                                {...nextButtonProps}
                            >
                                {isLastStep ? 'Complete' : nextButtonText}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
    className?: string;
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className = ''
}: StepContentWrapperProps) {
    const [parentHeight, setParentHeight] = useState<number>(0);

    return (
        <motion.div
            style={{ position: 'relative', overflow: 'hidden' }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={className}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            onHeightReady(containerRef.current.offsetHeight);
        }
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants: Variants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? '-100%' : '100%',
        opacity: 0
    }),
    center: {
        x: '0%',
        opacity: 1
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? '50%' : '-50%',
        opacity: 0
    })
};

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps) {
    return <div className="px-8">{children}</div>;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (clicked: number) => void;
    disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
    const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) {
            onClickStep(step);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            className="relative cursor-pointer outline-none focus:outline-none"
            animate={status}
            initial={false}
        >
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
                    active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },
                    complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }
                }}
                transition={{ duration: 0.3 }}
                className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
            >
                {status === 'complete' ? (
                    <CheckIcon className="h-4 w-4 text-black" />
                ) : status === 'active' ? (
                    <div className="h-3 w-3 rounded-full bg-[#060010]" />
                ) : (
                    <span className="text-sm">{step}</span>
                )}
            </motion.div>
        </motion.div>
    );
}

interface StepConnectorProps {
    isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
    const lineVariants: Variants = {
        incomplete: { width: 0, backgroundColor: 'transparent' },
        complete: { width: '100%', backgroundColor: '#5227FF' }
    };

    return (
        <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600">
            <motion.div
                className="absolute left-0 top-0 h-full"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? 'complete' : 'incomplete'}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> { }

function CheckIcon(props: CheckIconProps) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    delay: 0.1,
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.3
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}`;

  const props = [
    {
      name: 'initialStep',
      type: 'number',
      default: '1',
      description: 'The starting step number',
    },
    {
      name: 'onStepChange',
      type: '(step: number) => void',
      default: '() => {}',
      description: 'Callback when step changes',
    },
    {
      name: 'onFinalStepCompleted',
      type: '() => void',
      default: '() => {}',
      description: 'Callback when the final step is completed',
    },
    {
      name: 'backButtonText',
      type: 'string',
      default: "'Back'",
      description: 'Text for the back button',
    },
    {
      name: 'nextButtonText',
      type: 'string',
      default: "'Continue'",
      description: 'Text for the next button',
    },
    {
      name: 'disableStepIndicators',
      type: 'boolean',
      default: 'false',
      description: 'Disable clicking on step indicators',
    },
  ];

  return (
    <ComponentDetail
      title="Stepper"
      description="A multi-step form component with smooth transitions and customizable content."
      preview={preview}
      customization={customization}
      code={codeExample}
      usage={usageCode}
      props={props}
      dependencies={['motion']}
    />
  );
};

export default StepperPage;