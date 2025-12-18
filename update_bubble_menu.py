import os
import re

component_path = r'c:\Users\panig\Desktop\Projects\2Partial Developed\React Bits\src\react-app\components\effects\BubbleMenu.tsx'
page_path = r'c:\Users\panig\Desktop\Projects\2Partial Developed\React Bits\src\react-app\pages\BubbleMenu.tsx'

def escape_for_template_literal(text):
    # Escape backticks
    text = text.replace('`', '\\`')
    # Escape ${}
    text = text.replace('${', '\\${')
    return text

try:
    with open(component_path, 'r', encoding='utf-8') as f:
        component_code = f.read()

    with open(page_path, 'r', encoding='utf-8') as f:
        page_content = f.read()

    escaped_code = escape_for_template_literal(component_code)

    # Define the placeholder to look for
    placeholder_start = "const codeExample = `// Full component code available in the repository"
    
    # Find the start and end indices
    start_idx = page_content.find(placeholder_start)
    if start_idx == -1:
        print("Error: Placeholder start not found.")
        exit(1)
        
    # Find the end index starting from the start index
    end_idx = page_content.find("`;", start_idx)
    if end_idx == -1:
        print("Error: Placeholder end not found.")
        exit(1)

    # Construct the new content
    new_page_content = (
        page_content[:start_idx] +
        "const codeExample = `" +
        escaped_code +
        page_content[end_idx:]
    )

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(new_page_content)

    print("Successfully updated BubbleMenu.tsx")

except Exception as e:
    print(f"An error occurred: {e}")
