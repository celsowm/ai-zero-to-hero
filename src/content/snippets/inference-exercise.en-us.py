# Simulação de configuração vLLM
# Em produção: vllm serve model --gpu-memory-utilization 0.99 --max-num-seqs 2048

import sys

# BUG: estes valores causam OOM!
gpu_memory_utilization = 0.99  # muito alto — reserve memória para overhead
max_num_seqs = 2048  # muitas sequências simultâneas
max_model_len = 4096

def check_config(util, num_seqs, model_len):
    """Verifica se a configuração é segura para uma GPU de 24GB."""
    available_mem = 24 * 1024  # 24GB em MB
    needed_mem = model_len * num_seqs * 0.001 * 2  # estimativa KV cache
    overhead = available_mem * (1 - util)

    if overhead < 500:  # precisa de pelo menos 500MB de overhead
        print(f"OOM: overhead insuficiente ({overhead:.0f}MB < 500MB)")
        return False
    if num_seqs > 512:
        print(f"OOM: max_num_seqs {num_seqs} é muito alto")
        return False
    if util > 0.95:
        print(f"OOM: gpu_memory_utilization {util} deixa margem insuficiente")
        return False
    print(f"OK: config segura (overhead={overhead:.0f}MB, seqs={num_seqs})")
    return True

check_config(gpu_memory_utilization, max_num_seqs, max_model_len)
