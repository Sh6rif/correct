from autocorrect import Speller
import sys
import json

def correct_spelling(text):
    spell = Speller(lang='en')
    words = text.split()
    corrected_words = [spell(w) for w in words]
    corrected_text = ' '.join(corrected_words)
    return corrected_text

if __name__ == "__main__":
    input_text = json.loads(sys.stdin.readline())['text']
    corrected_text = correct_spelling(input_text)
    print(corrected_text)
    sys.stdout.flush()