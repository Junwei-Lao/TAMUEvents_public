const express = require('express');
const cors = require('cors');
const { OpenAI } = require("openai");
const axios = require("axios");
const cheerio = require('cheerio');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize OpenAI with API key
const openai = new OpenAI({
    apiKey: "APIkey",
});

app.post('/receiving_element', async (req, res) => {
    try {
        const task = req.body.mainText;
        const url = 'https://ers.tamu.edu/';

        const response = await axios.get(url);
        const cheerfilter = cheerio.load(response.data);

        let elementsArray = [];

        cheerfilter('.el-name').each((_, element) => { elementsArray.push(cheerfilter(element).html()); });

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a brilliant and helpful assistant who can distinguish web content and provide people with appropriate events from the array." },
                { role: "user", content: `Given the following list of events: ${elementsArray}, find and return any that are most relevant to the following task: '${task}'. Format your response with important details on separate lines using \\n.` }
            ],
            temperature: 0.7,
        });

        res.json({ AIResponse: aiResponse.choices[0].message.content });
        console.log('Received data and processed successfully');

    } catch (error) {
        console.log("An error occur: ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }

});

app.listen(6500, () => {
    console.log('Server is running on port 6500');
});
