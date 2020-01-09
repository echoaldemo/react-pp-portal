import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core/';

export default function SignInLoader() {
    return (
        <div
            style={{
                display: 'flex',
                position: 'absolute',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '450px',
                zIndex: '1',
                top: '-15px',
                left: '0',
            }}
            data-cy='sign-in-loader'
        >
            <Typography
                style={{
                    color: 'rgba(0,0,0,0.6)',
                }}
                variant="h6"
            >
                Logging in...
            </Typography>
            <CircularProgress
                thickness={5}
                variant={'indeterminate'}
                style={{
                    marginTop: '30px',
                    height: '45px',
                    width: '45px',
                    color: '#5f7d98'
                }}
            />
        </div>
    )
}