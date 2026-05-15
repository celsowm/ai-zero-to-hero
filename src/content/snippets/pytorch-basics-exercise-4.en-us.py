import numpy as np

def batch_stats(batch):
    # batch é um array (4, 3) - 4 amostras, 3 features
    # calcule a média de cada feature
    means = 
    # calcule o desvio padrão de cada feature
    stds = 
    return means, stds

# teste
np.random.seed(42)
batch = np.random.randn(4, 3)
m, s = batch_stats(batch)
print(f"Médias: {np.round(m, 4)}")
print(f"Stds: {np.round(s, 4)}")