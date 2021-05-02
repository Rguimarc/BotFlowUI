import MUIRichTextEditor from 'mui-rte'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, Theme, MuiThemeProvider } from '@material-ui/core/styles'
import RedditIcon from '@material-ui/icons/Reddit';
import { Paper, Grid } from '@material-ui/core';
import InteractionBlockContext from './interactionBlockContext';

const styles = theme => ({
    card: {
        transition: '0.3s',
        padding: '2px 16px',
        width: "100%",
        borderRadius: '10px',
        border: '2px solid #e33371',
        display: 'flex',
        justify: 'flex-start'
    }
});


const Response = (props) => {


    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);

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

    const [itentState, setResponseState] = useState({
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
        status:  props.status

    });


    function onSaveRichText(data) {
        console.log("NO SAVERICHTEXT")
        console.log(interactionContext)
        setResponseState(
            {
                status: 'saved',
                data: stateToHTML(convertFromRaw(JSON.parse(data)))
            })

        var foundIndex = interactionContext.responses.findIndex(x => x.id == props.id);
        var updateResponse = { ...interactionContext.responses[foundIndex] };
       
        updateResponse.phrase = data;
        updateResponse.saved = true;
        console.log(interactionContext)
        props.onSave(props.id,updateResponse);
    }

console.log("RESPONSEEEEEEEEEEEEE")
console.log(interactionContext)
console.log(props)
    const template = { __html: itentState.data }

    if (props.saved == false) {
        return (
            <Grid container style={{ paddingLeft: '60px', paddingTop: '10px', paddingRight: '40px' }}>
                <Grid item >
                    <MuiThemeProvider theme={itentState.theme}>
                        <MUIRichTextEditor label="Digite a reposta do bot..." theme={itentState.theme} onSave={onSaveRichText}
                            autocomplete={{
                                strategies: [
                                    {
                                        items: itentState.emojis,
                                        triggerChar: ":"
                                    }
                                ]
                            }}
                        />
                    </MuiThemeProvider>
                </Grid>
            </Grid>)
    } else if (props.saved == true) {
        return (
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                        <div style={{ padding: 10 }}>
                            <RedditIcon color="secondary" />
                        </div>
                        <Paper className={props.classes.card} elevation={3}
                            dangerouslySetInnerHTML={template}>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Response);
