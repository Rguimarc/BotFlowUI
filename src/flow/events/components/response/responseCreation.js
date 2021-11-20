import MUIRichTextEditor from 'mui-rte'
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';


const  ResponseCreation = (props) => {

    console.log("ResponseCreation Component Init Props: ", props);

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

    const [responseCreationState, setResponseCreationState] = useState({
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
    });




    return (
        <Grid container style={{ paddingLeft: '60px', paddingTop: '10px', paddingRight: '40px' }}>
            <Grid item >
                <MuiThemeProvider theme={responseCreationState.theme}>
                    <MUIRichTextEditor label="Digite a reposta do bot..." theme={responseCreationState.theme} onSave={props.onSaveRichText}
                        autocomplete={{
                            strategies: [
                                {
                                    items: responseCreationState.emojis,
                                    triggerChar: ":"
                                }
                            ]
                        }}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>)

}
export default ResponseCreation