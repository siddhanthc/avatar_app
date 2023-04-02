# GPT Demo

import openai
import os
import speech_recognition as sr
import pyttsx3

# Set your OpenAI API key
openai.api_key = os.environ["OPENAI_API_KEY"]

# Define system message for chatgpt
messages = [
    {"role": "system", "content": "You are a helpful and kind AI Assistant."},
]

# Config function to set the parameters for the chatgpt chatcompletion api
def set_gpt_config(model_engine = "gpt-3.5-turbo", temperature = 1, max_tokens = 1000):
    gpt_config = {
        "model_engine": model_engine,
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    return gpt_config


# Function to generate response from ChatGPT
def get_response(gpt_config, prompt):

    # Use the Chat Completion API
    messages.append({"role": "user", "content": prompt})
    chat = openai.ChatCompletion.create(
        model = gpt_config["model_engine"], 
        temperature = gpt_config["temperature"],
        max_tokens = gpt_config["max_tokens"],
        messages = messages
    )
    response = chat.choices[0].message.content
    messages.append({"role": "assistant", "content": response})
    
    return response

# A function that takes input from microphone
def listenCommand(r = sr.Recognizer()):
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source, timeout=5, phrase_time_limit=5)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")

    except Exception as e:
        print(e)
        print("Say that again please...")
        return "None"
    return query

# Function to set the tts engine
def setTTS():
    engine = pyttsx3.init()
    # voices = engine.getProperty('voices')
    # engine.setProperty('voice', voices[1].id)
    return engine

# Function to convert text to speech
def speak(engine,text):
    engine.say(text)
    engine.runAndWait()


# Main function
if __name__ == '__main__':

    # Set the TTS engine
    engine = setTTS()

    # Create speech recognition object
    r = sr.Recognizer()

    # Create config object for ChatGPT
    gpt_config = set_gpt_config(model_engine="gpt-3.5-turbo", temperature=1, max_tokens=1000)
    
    # Define the prompt
    prompt = listenCommand(r)

    # Generate the response from ChatGPT
    response = get_response(gpt_config, prompt)

    # Print the generated response
    print(response)

    # Convert the response to speech
    speak(engine, response)    



