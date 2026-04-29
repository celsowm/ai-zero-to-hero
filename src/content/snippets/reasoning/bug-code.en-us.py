# BUG: Thinking Blocks parser broken in production

import re

class ReasoningParser:
    """Parser to extract thinking blocks from reasoning model responses."""
    
    THINKING_PATTERN = r'<thought>(.*?)</thought>'
    
    def parse(self, response: str) -> dict:
        """Extract thinking and answer from model response."""
        match = re.search(self.THINKING_PATTERN, response)
        
        if match:
            thinking = match.group(1)
            answer = response.replace(match.group(0), '').strip()
            return {
                'thinking': thinking,
                'answer': answer,
                'has_thinking': True
            }
        else:
            return {
                'thinking': '',
                'answer': response,
                'has_thinking': False
            }

# Test
parser = ReasoningParser()

# Example 1: thinking with multiple paragraphs (BUG!)
response_with_multiline = """<thought>
First, I'll analyze the problem.

The equation is 3x + 7 = 22.
Subtract 7: 3x = 15.
Divide by 3: x = 5.

Checking: 3(5) + 7 = 15 + 7 = 22. OK.
</thought>

The answer is x = 5."""

result = parser.parse(response_with_multiline)
print(f"Has thinking: {result['has_thinking']}")
print(f"Thinking: '{result['thinking']}'")
print(f"Answer: '{result['answer']}'")

# BUG: The regex doesn't capture multi-line because '.' doesn't match newline!
# Thinking comes empty and answer has everything mixed up.
