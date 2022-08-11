import * as React from 'react'
import { Container, Grid } from '@mui/material'

interface Props {
    children: React.ReactNode
}
const DashboardLayout: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Container sx={{
            flexGrow: 1,
            pt: 4,
            m: 4
        }}>
            {props.children}
        </Container>
    )
}

export default DashboardLayout;