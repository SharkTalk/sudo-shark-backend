const { Configuration, OpenAIApi } = require('openai');

// setting up authorized access to the Dall-e API

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const apiController = {};

// middleware for translating code into plain english
apiController.getTranslation = async (req, res, next) => {
  console.log(req.body);
  // get the data from the body on the request
  const { language } = req.body; // Python, JavaScript...
  const { text } = req.body; // code...

  // tempreture can a stretch feature - if we let user decide on the tempreture,
  // we will get on the req.body as well
  const tempreture = 0.7;

  try {
    // making a call to the Dall-e API
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Summarize this for a second-grade student:\n${language} \n${text}`,
      temperature: tempreture,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // getting rid of the first 2 '\n' symbols (they will probably be on all of our responses)
    const responseText = response.data.choices[0].text.split('');
    while (responseText[0] === '\n' && responseText.length > 1) {
      responseText.shift();
    }

    // storing text in form of the string on the response locals object
    res.locals.text = responseText.join('');
  } catch (err) {
    // error handling
    const ourErr = {
      log: 'Express error handler caught error in the getTranslation apiController',
    };
    next(ourErr);
  }

  next();
};

module.exports = apiController;
