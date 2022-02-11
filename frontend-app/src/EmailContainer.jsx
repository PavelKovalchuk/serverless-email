import React, {useState} from "react";
import {Paper, TextField, Button, Card, Typography} from "@material-ui/core";
import axios from "axios";

const EmailContainer = () => {
  const [destinationEmail, setDestinationEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [message, setMessage] = useState({text: "", type: ""});

  const sendEmail = () => {
    console.log("sendEmail", {
      destinationEmail,
      emailSubject,
      emailContent
    });
    
    axios.post(process.env.REACT_APP_SEND_EMAIL_ENDPOINT, {
      to: destinationEmail,
      subject: emailSubject,
      text: emailContent,
      from: process.env.REACT_APP_EMAIL
    }).then(() => {
      setDestinationEmail("");
      setEmailSubject("");
      setEmailContent("");
      setMessage({text: "Success", type: "success"});
    }).catch(
      (error) => {
        setDestinationEmail("");
        setEmailSubject("");
        setEmailContent("");
        setMessage({text: "Error", type: "error"});
      }
    );
  };

  return (
    <div className="email-container">
      <Paper>
        {message.text ? 
          <Card>
            <Typography 
              color={message.type === "error" ? "error" : "primary"} gutterBottom>
              {message.text}
            </Typography>
          </Card>
          : null}
        <form>
          <TextField 
            id="destinationEmailAddress" 
            label="Destination Email Address" 
            value={destinationEmail}
            onChange={(e) => {setDestinationEmail(e.target.value)}}
          />
          <TextField 
            id="emailSubject" 
            label="Email Subject" 
            value={emailSubject}
            onChange={(e) => {setEmailSubject(e.target.value)}}
          />
          <TextField 
            id="emailContent" 
            label="Email Content" 
            value={emailContent}
            onChange={(e) => {setEmailContent(e.target.value)}}
          />
          <Button 
            variant="contained"
            color="primary" 
            onClick={sendEmail}
          >
            Send email
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EmailContainer;