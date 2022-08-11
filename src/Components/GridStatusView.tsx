import React, { FC, useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import StatusDetail from './StatusDetail';
import { debounce } from 'lodash';

const endpointList = [
    'accounts',
    'assets',
    'customers',
    'datapoints',
    'devices',
    'documents',
    'forms',
    'invites',
    'media',
    'messages',
    'namespaces',
    'orders',
    'patients',
    'relationships',
    'rules',
    'templates',
    'users',
    'workflows'
]

const GridStatusView: FC = () => {

  return (
    <Container>
        <Grid container spacing={3}>
            {endpointList.map((endpoint, index) => {
                return (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <StatusDetail endpoint={endpoint} />
                    </Grid>
                )
            }
            )}
        </Grid>
    </Container>
  );
};

export default GridStatusView;