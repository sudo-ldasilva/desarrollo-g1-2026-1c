import * as React from 'react';
import ProximosTurnos from '../../components/ProximosTurnos/ProximosTurnos.jsx'
import { Box } from '@mui/material'

const MiAgenda = () => {
    return (
            <Box
                className="dashboard-panels"
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <ProximosTurnos />
            </Box>
    );
}

export default MiAgenda;
