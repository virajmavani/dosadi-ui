"use client";

import { useState } from 'react';
import { Theme, Heading, TextArea, Text, Button } from '@radix-ui/themes';
import * as Progress from '@radix-ui/react-progress';
import { Spotlight } from './ui/Spotlight';
import axios from 'axios';

const LandingPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [textContent, setTextContent] = useState("");
    const [intendedOutcome, setIntendedOutcome] = useState("");
    const [resultsLoadingVisible, setResultsLoadingVisible] = useState(false);
    const [progress, setProgress] = useState(10);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [resultsLabelVisible, setResultsLabelVisible] = useState(false);
    const [responseText, setResponseText] = useState("");

    const handleSubmitButton = async () => {
        setResultsLabelVisible(true);
        setResultsVisible(false);
        setResultsLoadingVisible(true);
        setProgress(10);
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                setProgress(i);
            }, 10);
        }
        const cache = localStorage.getItem(`${firstName},${lastName},${textContent},${intendedOutcome}`);
        let responseText;
        if (cache) {
            responseText = cache;    
        } else {
            responseText = (await callDosadiApi()).data;
        }
        setResponseText(responseText.toString());
        setResultsLoadingVisible(false);
        setResultsVisible(true);
        localStorage.setItem(`${firstName},${lastName},${textContent},${intendedOutcome}`, responseText.toString());
    };

    const callDosadiApi = async () => {
        return await axios.post(
            "http://localhost:8000/callDosadi",
            {
                firstName: firstName,
                lastName: lastName,
                caseDescription: textContent,
                intendedOutcome: intendedOutcome
            }
        );
    }

    const handleFirstNameChange = (event: any) => {
        setResultsLabelVisible(false);
        setResultsVisible(false);
        setResultsLoadingVisible(false);
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: any) => {
        setResultsLabelVisible(false);
        setResultsVisible(false);
        setResultsLoadingVisible(false);
        setLastName(event.target.value);
    }

    const handleTextChange = (event: any) => {
        setResultsLabelVisible(false);
        setResultsVisible(false);
        setResultsLoadingVisible(false);
        setTextContent(event.target.value);
    }

    const handleIntendedOutcomeChange = (event: any) => {
        setResultsLabelVisible(false);
        setResultsVisible(false);
        setResultsLoadingVisible(false);
        setIntendedOutcome(event.target.value);
    }

    return (
        <Theme
            accentColor="green"
            appearance="dark"
            radius="large"
            scaling="95%"
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="flex min-h-screen flex-col items-center space-y-10 p-24 w-screen">
                <div className="flex items-center">
                    <Heading>
                        Dosadi - Your AI Paralegal 👨‍⚖️⚖️🏢
                    </Heading>
                </div>
                <div className="flex items-center">
                    <Text>
                        Build strategy for your client case using this AI Paralegal.
                    </Text>
                </div>

                <div className="flex items-center w-full">
                    <TextArea className="w-full" placeholder="First Name" onChange={handleFirstNameChange}/>
                </div>
                <div className="flex items-center w-full">
                    <TextArea className="w-full" placeholder="Last Name" onChange={handleLastNameChange}/>
                </div>
                <div className="flex items-center w-full">
                    <TextArea className="w-full h-64" placeholder="Case Description" onChange={handleTextChange}/>
                </div>
                <div className="flex items-center w-full">
                    <TextArea className="w-full" placeholder="Intended Outcome" onChange={handleIntendedOutcomeChange}/>
                </div>

                <div className="flex items-center">
                    <Button className="w-full" onClick={handleSubmitButton}>Submit 🔎</Button>
                </div>

                <div className={"flex flex-col items-center " + (resultsLabelVisible ? "visible" : "hidden")}>
                    <Heading className="w-full">Results</Heading>
                </div>
                <div className="flex flex-col items-center">
                    <Progress.Root className={"ProgressRoot " + (resultsLoadingVisible ? "visible" : "hidden")} value={progress}>
                        <Progress.Indicator
                            className={"ProgressIndicator " + (resultsLoadingVisible ? "visible" : "hidden")}
                            style={{ transform: `translateX(-${100 - progress}%)` }}
                        />
                    </Progress.Root>
                    <Text className={resultsVisible ? "visible": "hidden"}>{responseText.toString()}</Text>
                </div>
            </div>
        </Theme>
    );
}

export default LandingPage;
