import React, { FC, useState, useEffect } from 'react';
import { Card, Typography, Chip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, Box } from '@mui/material';
import { useQuery } from 'react-query';
import { getAPITime } from '../utils/getAPITime';

interface IStatusDetail {
    endpoint: string;
}

const StatusDetail: FC<IStatusDetail> = ({ endpoint }) => {
    const [openModal, setOpenModal] = useState(false)
    const [isAPIHealthy, setIsAPIHealthy] = useState(true)
    const timeToRefetch = 15

    const handleClose = () => {
        setOpenModal(false);
    };

    const fetchStatus = async (endpoint: string) => {
        const res = await fetch(`https://api.factoryfour.com/${endpoint}/health/status`);
        return res.json();
    };

    const { data: endpointData, isLoading: isEndpointLoading, refetch: refetchData } = useQuery(
        ['status', endpoint],
        () => fetchStatus(endpoint),
        {
            onSuccess: (data: any) => {
                console.log(data)
            },
            onError: (err: any) => {
                setIsAPIHealthy(false)
            },
        }
    );

    useEffect(() => {
        setInterval(refetchData, timeToRefetch * 1000)
    }, [])

    if (isEndpointLoading) {
        return (
            <Box sx={{
                mt: 2,
            }}>
                <LinearProgress />
            </Box>
        )
    }
    else {
        return (
            <Card sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography color="gray" variant="h5">
                    {endpoint}
                </Typography>
                <Chip
                    sx={{
                        color: 'white',
                        backgroundColor: isAPIHealthy ? '#39b064' : '#f44336',
                        borderWidth: 0,
                        py: 0,
                    }}
                    size="small"
                    label='Status'
                    variant="outlined"
                />
                <Typography color="gray" variant="body1">
                    {endpointData?.hostname}
                </Typography>
                <Typography color="gray" variant="body1">
                    {isAPIHealthy ? getAPITime(endpointData?.time) : 'OUTAGE'}
                </Typography>
                <Button
                    onClick={() => setOpenModal(true)}
                    fullWidth
                    sx={{ mt: 1 }}
                    color="primary"
                    size="small"
                    variant="contained"
                    disabled={!isAPIHealthy}
                >
                    {isAPIHealthy ? 'View Message' : 'Error 503 - Service Unavailable'}
                </Button>
                {openModal && (
                    <Dialog
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Message from {endpoint}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {endpointData?.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Card>
        );
    }
};

export default StatusDetail;