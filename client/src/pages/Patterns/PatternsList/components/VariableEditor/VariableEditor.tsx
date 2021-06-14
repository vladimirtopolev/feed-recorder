import {FC} from 'react';
import {Pattern} from '@api/pattern';
import {Box, Typography} from '@material-ui/core';


enum Mode {
    VIEW,
    EDIT
}

type VariableEditorType = {
    pattern: Pattern,
    mode?: Mode
}

export const VariableEditor: FC<VariableEditorType> = ({pattern, mode = Mode.VIEW}) => {
    return (
        <>
            <Typography>Variables</Typography>
            {pattern.variables.map(variable => (
                <Box key={variable.key}>{variable.key}</Box>
            ))}
        </>
    );
};