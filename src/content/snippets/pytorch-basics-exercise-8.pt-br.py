import numpy as np

def batch_stats(batch):
    # batch is a (4, 3) array - 4 samples, 3 features
    # calculate the mean of each feature
    means = 
    # calculate the std of each feature
    stds = 
    return means, stds

# test
np.random.seed(42)
batch = np.random.randn(4, 3)
m, s = batch_stats(batch)
print(f"Means: {np.round(m, 4)}")
print(f"Stds: {np.round(s, 4)}")