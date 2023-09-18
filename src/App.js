import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import Header from "./components/Header/Header.js";
import Definitions from "./components/Definitions/Definitions.js";

function App() {
    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);
    const [category, setCategory] = useState("en");
    const dictionaryApi = async () => {
        try {
            const data = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
            );
            setMeanings(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(meanings, 'a');

    useEffect(() => {
        dictionaryApi();
    }, [word, category]);

    return (
        <div className="App"
             style={{
                 height: "100vh",
                 backgroundColor: "#282c34",
                 color: "white",
                 transition: "all 0.5s linear",
             }}>
            <Container
                maxWidth="md"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    justifyContent: "space-evenly",
                }}
            >
                <Header category={category}
                        setCategory={setCategory}
                        word={word}
                        setWord={setWord}
                ></Header>

                {meanings && (
                    <Definitions
                        meanings={meanings}
                        word={word}
                        category={category}
                    />
                )}

            </Container>
        </div>
    );
}

export default App;
