sudo apt update
sudo apt install -y git build-essential cmake
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build
cmake --build build --config Release
./build/bin/llama-cli -hf ggml-org/gemma-3-1b-it-GGUF -p "Hello, world!"
