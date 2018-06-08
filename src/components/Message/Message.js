import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class ConsecutiveSnackbars extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            messageInfo: {
                message: props.msg,
                key: new Date().getTime(),
            },
        };
        this.queue = [];
    }

    componentWillReceiveProps(props) {
        if (props.msg) {
            this.queue.push({
                message: props.msg,
                key: new Date().getTime(),
            });
        }
        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({open: false});
        } else {
            this.processQueue();
        }
    }

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                open: true,
            });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        const {classes} = this.props;
        const {message, key} = this.state.messageInfo;
        return (
            <div>
                <Snackbar
                    key={key}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

ConsecutiveSnackbars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsecutiveSnackbars);