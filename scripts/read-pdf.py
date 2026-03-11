import fitz # PyMuPDF
import sys

def main():
    doc = fitz.open(sys.argv[1])
    text = ""
    for page in doc:
        text += page.get_text()
    print(text)

if __name__ == "__main__":
    main()
