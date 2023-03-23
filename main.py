# GPT Demo

import openai
import os

# Set your OpenAI API key
openai.api_key = os.environ["OPENAI_API_KEY"]


def get_response(prompt):
    # Define the parameters for the text generation API call
    model_engine = "text-davinci-002"
    temperature = 1
    max_tokens = 1000

    # Call the OpenAI API to generate text
    response = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response


# Main function
if __name__ == '__main__':
    prompt = "What is best way to get sound sleep"

    # Generate the response from ChatGPT
    response = get_response(prompt)

    # Print the generated text
    print(response.choices[0].text.strip())


