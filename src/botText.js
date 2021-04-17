import MUIRichTextEditor from 'mui-rte'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, Theme, MuiThemeProvider } from '@material-ui/core/styles'
import RedditIcon from '@material-ui/icons/Reddit';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    card: {
        /* Add shadows to create the "card" effect */
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        boxshadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        padding: '2px 16px',
        background: '#e33371',
        color: '#FFFFFF',
        width: "100%"
    }
});

class BotText extends Component {


    constructor(props) {

        const defaultTheme = createMuiTheme({
            palette: {
                primary: {
                    main: "#000000"
                }
            }
        })

        Object.assign(defaultTheme, {
            overrides: {
                MUIRichTextEditor: {
                    root: {
                        backgroundColor: "#ebebeb",
                    },
                    container: {
                        display: "flex",
                        flexDirection: "column-reverse"
                    },
                    editor: {
                        backgroundColor: "#e33371",
                        padding: "20px",
                        height: "200px",
                        maxHeight: "200px",
                        overflow: "auto",
                        color: '#FFFFFF'
                    },
                    toolbar: {
                        borderTop: "1px solid gray",
                        backgroundColor: "#ebebeb"
                    },
                    placeHolder: {

                        color: '#FFFFFF',
                        paddingLeft: 20,
                        width: "inherit",
                        position: "absolute",
                        top: "20px"
                    },
                    anchorLink: {
                        color: "#333333",
                        textDecoration: "underline"
                    }
                }
            }
        })


        super(props);

        this.state = {
            theme: defaultTheme,
            data: '',
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
            ],
            status: this.props.status
        }
    }

    saveIntent(data) {
        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].phrase = data;
        this.props.dialogs[foundIndex].saved = true;
    }

    onSaveRichText = (data) => {

        this.setState({ status: 'saved', data: stateToHTML(convertFromRaw(JSON.parse(data))) })

        this.props.handleTextChangeCallback(this.props.id, stateToHTML(convertFromRaw(JSON.parse(data))))

        this.saveIntent(data);

        this.props.onSave();
    }

    render() {

        const template = { __html: this.state.data }

        const { classes } = this.props;

        if (this.state.status == 'draft') {
            return (
                <Grid container>
                     
                    <Grid item >
                        <MuiThemeProvider theme={this.state.theme}>
                            <MUIRichTextEditor label="Digite a reposta do bot..." theme={this.state.theme} onSave={this.onSaveRichText}
                                autocomplete={{
                                    strategies: [
                                        {
                                            items: this.state.emojis,
                                            triggerChar: ":"
                                        }
                                    ]
                                }}
                            />
                        </MuiThemeProvider>
                    </Grid>
                </Grid>)
        } else if (this.state.status == 'saved') {
            return (
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <div style={{ display: "flex", alignItems: 'baseline' ,width: "100%"}}>
                            <div style={{padding:10}}>
                                <RedditIcon color="primary" />
                            </div>
                            <div className={classes.card}
                                dangerouslySetInnerHTML={template}>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            )
        }

    }
}

export default withStyles(styles, { withTheme: true })(BotText);
