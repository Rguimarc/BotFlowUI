import React, { Component } from 'react';
import IntentText from './intentText'
import { withStyles } from '@material-ui/core/styles';
import BotText from './botText';

const styles = theme => ({
    gridText: {
        margin: 10
    },
    root: {
        "& .MuiFilledInput-root": {
            background: "rgba( 249, 240, 255, 1 )",
        }
    }
});

class DialogText extends Component {

    render(props) {

        const { classes } = this.props;

        return (


            <div className={classes.gridText}>
                {
                    this.props.item.type == 'bot' ?
                        <BotText
                            dialogs={this.props.dialogs}
                            onSave={() => this.props.saveIntentCallback()}
                            handleTextChangeCallback={() => this.props.handleTextChangeCallback(this.props.item.id, '')}
                            id={this.props.item.id}
                            status={this.props.saved == false ? 'draft' : 'saved'}>
                        </BotText> :
                        <IntentText
                            dialogs={this.props.dialogs}
                            onSave={() => this.props.saveIntentCallback()}
                            handleTextChangeCallback={() => this.props.handleTextChangeCallback(this.props.item.id, '')}
                            id={this.props.item.id}
                            status={this.props.saved == false ? 'draft' : 'saved'}
                        ></IntentText>
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DialogText);

