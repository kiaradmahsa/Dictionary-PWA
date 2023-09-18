import React from 'react';
import './Header.css';
import {MenuItem, Select, TextField} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import categories from "../../data/category";

const Header = ({setCategory, category , word, setWord}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            mode: 'dark',
        },
    });
    const handleChange = (language)=> {
        setCategory(language);
        setWord("");
    }
    return (

        <div className="header">
            <span className="title">{word? word :"Word Hunt"}</span>
            <div className='inputs'>
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        value={word}
                        onChange={(e)=>setWord(e.target.value)}
                        className="search"
                        id="standard-basic"
                        label="Search a word"
                        variant="standard"/>

                    <TextField
                        select
                        className="select"
                        label="Language"
                        value={category}
                        onChange={(e)=>handleChange(e.target.value)}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

                </ThemeProvider>
            </div>
        </div>

    )
}

export default Header;