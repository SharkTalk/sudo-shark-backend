const { Configuration, OpenAIApi } = require("openai");

// setting up authorized access to the Dall-e API

const configuration = new Configuration({
    apiKey: process.env.DALLE_API_KEY
  });
const openai = new OpenAIApi(configuration);

apiController = {};

// middleware for translating code into plain english
apiController.getTranslation = async(req, res, next) => {
    // get the data from the body on the request
    const language = req.body.language;
    const text = req.body.text;

    // tempreture can a stretch feature - if we let user decide on the tempreture, 
    // we will get 
    const tempreture = 0;
    const Text = "def remove_common_prefix(x, prefix, ws_prefix): \n    x[\"completion\"] = x[\"completion\"].str[len(prefix) :] \n    if ws_prefix: \n        # keep the single whitespace as prefix \n        x[\"completion\"] = \" \" + x[\"completion\"] \nreturn x \n\n# Explanation of what the code does\n\n# The function removes the common prefix of a column in a dataframe, using a provided prefix\n\n# It takes in three arguments: \n# x - the dataframe\n# prefix - the prefix to be removed\n# ws_prefix - a boolean indicating whether the prefix includes a whitespace";
    const Language = "# Python 3";
    const MockText =  "function capitalize(arr):\n  for(let i = 0; i < arr.length; i++){\n    arr[i][0].toUpperCase();\n}";
    const MockLanguage = "# JavaScript "

    try {

        // making api call to Dall-e
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Summarize this for a second-grade student:\nPython 3 \ndef remove_common_prefix(x, prefix, ws_prefix): \n  x["completion"] = x["completion"].str[len(prefix) :] \n  if ws_prefix: \n  x["completion"] = " " + x["completion"] \nreturn x`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // getting rid of the first 2 '\n' symbols (they will probably be on all of our responses)
        const responseText = response.data.choices[0].text.split('');
        console.log(responseText);
        while (responseText[0] === '\n' && responseText.length > 1) {
            responseText.shift();
        }

        // storing text in form of the string on the response locals object
        res.locals.text = responseText.join('');
    } catch(err) {
        // error handling
        const ourErr = {
            log: 'Express error handler caught error in the getTranslation apiController',
        };
        next(ourErr)
    }

    next();
}


module.exports = apiController;