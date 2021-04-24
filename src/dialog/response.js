import MUIRichTextEditor from 'mui-rte'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, Theme, MuiThemeProvider } from '@material-ui/core/styles'
import RedditIcon from '@material-ui/icons/Reddit';
import { Paper, Grid } from '@material-ui/core';

const styles = theme => ({
    card: {
        /* Add shadows to create the "card" effect */
        //boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        //boxshadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        padding: '2px 16px',
        width: "100%",
        //borderRadius: '25px',
        borderRadius: '10px',
        border: '2px solid #e33371',
        display: 'flex',
        justify: 'flex-start'
    }
});

class Response extends Component {


    constructor(props) {

        const defaultTheme = createMuiTheme({
            palette: {

            }
        })

        Object.assign(defaultTheme, {
            overrides: {
                MUIRichTextEditor: {
                    root: {
                        backgroundColor: "#ebebeb",
                        width: '100%'
                    },
                    container: {
                        display: "flex",
                        flexDirection: "column-reverse"
                    },
                    editor: {
                        backgroundColor: "#e33371",
                        padding: "20px",
                        height: "100px",
                        maxHeight: "200px",
                        overflow: "auto",
                        color: '#FFFFFF'
                    },
                    toolbar: {
                        borderTop: "1px solid gray",
                        backgroundColor: "#ebebeb",
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

        this.saveIntent(data);

        this.props.onSave();
    }

    render() {

        const template = { __html: this.state.data }

        const { classes } = this.props;

        if (this.state.status == 'draft') {
            return (
                <Grid container style={{ paddingLeft: '60px', paddingTop: '10px', paddingRight: '40px' }}>
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
                        <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                            <div style={{ padding: 10 }}>
                                <RedditIcon color="secondary" />
                            </div>
                            <Paper className={classes.card} elevation={3}
                                dangerouslySetInnerHTML={template}>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            )
        }

    }
}

export default withStyles(styles, { withTheme: true })(Response);
