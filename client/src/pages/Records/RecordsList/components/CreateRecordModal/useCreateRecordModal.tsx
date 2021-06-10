import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import useStyles from './CreateRecordModal.styles';
import {CreateRecord} from '@api/record';
import {useDispatch, useSelector} from 'react-redux';
import {patternListRequestAction} from '@store/reducers/patternList';
import {TitleStep} from './steps/TitleRecordStep';
import {PatternSwitcherStep} from './steps/PatternSwitcherStep';
import {PatternPopulationStep} from './steps/PatternPopulationStep';
import {Record} from '@api/record';
import {patternListSelector} from '@store/index';
import {Pattern} from '@api/pattern';
import {useAxiosFetch} from '@hooks/useAxiosFetch';
import {ModalComponent} from '@components/Modal/Modal';
import API from '@api/index';
import {Box} from '@material-ui/core';

const INIT_RECORD: CreateRecord = {
    name: '',
    feedsMeta: []
};

export enum CreateStrategy {
    FROM_SCRATCH,
    FROM_PATTERN
}


type CreateRecordModalProps = {
    isOpen: boolean,
    setModalState: (state: boolean) => void,
    actionAfterCreation?: () => void
}

type CreateRecordModalContextType = {
    createStrategy: CreateStrategy,
    setCreateStrategy: (strategy: CreateStrategy) => void,
    onClose: () => void;
    step: number,
    record: CreateRecord,
    createRecord: (record: CreateRecord) => void,
    setRecord: (record: CreateRecord) => void,
    changeStep: (i: number) => void,
    patterns: Pattern[],
    selectedPattern: Pattern | null | undefined,
    setPattern: (pattern: Pattern | null | undefined) => void
}
const CreateModalContext = createContext<CreateRecordModalContextType>({} as CreateRecordModalContextType);

export const CreateRecordModal: FC<CreateRecordModalProps> = ({isOpen, setModalState, actionAfterCreation}) => {
    const classes = useStyles();
    const [record, setRecord] = useState(INIT_RECORD);
    const [selectedPattern, setPattern] = useState<Pattern | null | undefined>();
    const [createStrategy, setCreateStrategy] = useState(CreateStrategy.FROM_SCRATCH);
    const {items: patterns} = useSelector(patternListSelector);


    const onClose = () => {
        setModalState(false);
        setCreateStrategy(CreateStrategy.FROM_SCRATCH);
        setPattern(null);
        setStep(0);
        setRecord(() => INIT_RECORD);
    };

    const StepContent: FC[] = [
        TitleStep,
        PatternSwitcherStep,
        PatternPopulationStep
    ];

    const {handleRequest, responseState} = useAxiosFetch<Record>();

    const [step, setStep] = useState(0);
    const changeStep = (i: number) => setStep(() => i);

    const createRecord = (record: CreateRecord) => {
        try {
            handleRequest(() => API.record.createItem(record));
        } catch (e) {

        } finally {
            actionAfterCreation && actionAfterCreation();
            onClose();
        }

    };

    const Content = StepContent[step];

    return (
        <CreateModalContext.Provider value={{
            createStrategy,
            setCreateStrategy,
            onClose,
            step,
            changeStep,
            record,
            setRecord,
            createRecord,
            patterns,
            selectedPattern,
            setPattern
        }}>
            <ModalComponent
                open={isOpen}
                isLoading={responseState.isLoading}
                onClose={onClose}
                title="Create Record"
            >
                <Box className={classes.modal}>
                    <Content/>
                </Box>
            </ModalComponent>
        </CreateModalContext.Provider>
    );
};

export const useCreateRecordModalContext = (): CreateRecordModalContextType => useContext(CreateModalContext);

type UseCreateRecordModalResponse = {
    createRecord: () => void,
    CreateRecordModal: FC<CreateRecordModalProps>,
    createRecordModalProps: CreateRecordModalProps
}

export const useCreateRecordModal = (actionAfterCreation?: () => void): UseCreateRecordModalResponse => {
    const [isOpen, setModalState] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(patternListRequestAction());
    }, []);

    const createRecord = () => setModalState(() => true);

    const createRecordModalProps: CreateRecordModalProps = {
        isOpen,
        setModalState,
        actionAfterCreation
    };

    return {
        createRecord,
        createRecordModalProps,
        CreateRecordModal,
    };
};