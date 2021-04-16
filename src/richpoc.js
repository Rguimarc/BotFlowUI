import MUIRichTextEditor from 'mui-rte'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import TextField from '@material-ui/core/TextField';
import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
     card : {
        /* Add shadows to create the "card" effect */
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        boxshadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        padding: '2px 16px'
      }
   
      
});

class RichTextComponent extends Component {

 
    constructor(props) {

        super(props);

        this.state = {
            dados: '',
            emojis: [
                {
                    keys: ["face", "grin"],
                    value: "😀",
                    content: "😀",
                },
                {
                    keys: ["face", "joy"],
                    value: "😂",
                    content: "😂",
                },
                {
                    keys: ["face", "sweat"],
                    value: "😅",
                    content: "😅",
                }
            ]
        }
    }


    onSaveRichText = (data) => {
        console.log(data)
        console.log(stateToHTML(convertFromRaw(JSON.parse(data))));
        this.setState({ dados: stateToHTML(convertFromRaw(JSON.parse(data))) })
    }

    render() {

        const template = { __html: this.state.dados }

        const { classes } = this.props;

        return (
            <div>
                <div className= {classes.card} dangerouslySetInnerHTML={template}>
                </div>
               
                <MUIRichTextEditor label="Your label" onSave={this.onSaveRichText}
                    autocomplete={{
                        strategies: [
                            {
                                items: this.state.emojis,
                                triggerChar: ":"
                            }
                        ]
                    }}
                /></div>)
    }
}

export default withStyles(styles, { withTheme: true })(RichTextComponent);
 