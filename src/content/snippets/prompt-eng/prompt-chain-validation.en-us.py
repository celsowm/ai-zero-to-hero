# Prompt Chaining: extraction + validation + summary

# Step 1: Extraction
text = "Company XYZ revenue was R$ 2.5M in 2024, with 150 employees and headquarters in São Paulo."

extraction_prompt = f"Extract from text: company, revenue, year, # employees, city.\nText: {text}"
# Simulates model output
extracted = {"company": "XYZ", "revenue": "R$ 2.5M", "year": "2024", "employees": "150", "city": "São Paulo"}

# Step 2: Validation
validation_prompt = f"Check if all fields are filled: {list(extracted.keys())}"
all_valid = all(v for v in extracted.values())
print(f"Validation: {'PASS' if all_valid else 'FAIL'}")

# Step 3: Summary
summary_prompt = f"Generate JSON summary with extracted data."
import json
summary = json.dumps(extracted, indent=2, ensure_ascii=False)

print("=== Prompt Chain ===")
print(f"1. Extraction: {extracted}")
print(f"2. Validation: {'PASS' if all_valid else 'FAIL'}")
print(f"3. Summary:\n{summary}")
