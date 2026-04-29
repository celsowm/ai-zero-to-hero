from langchain.tools import tool
import requests

@tool
def get_weather(city: str) -> str:
    """Fetch current weather for a city."""
    response = requests.get(
        f"https://api.weatherapi.com/v1/current.json?q={city}"
    )
    data = response.json()
    return f"{data['current']['temp_c']}°C, {data['current']['condition']['text']}"
