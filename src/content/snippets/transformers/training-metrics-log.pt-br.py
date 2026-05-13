# Exemplo de logs de treinamento do Hugging Face Trainer
# Estes logs aparecem periodicamente durante o comando trainer.train()

# Step 1: Início do treino (Warmup)
# {'loss': 1.7042, 'grad_norm': 28.4, 'learning_rate': 8e-08, 'epoch': 0.01}

# Step 100: Fim do warmup, loss começando a cair
# {'loss': 1.4215, 'grad_norm': 15.2, 'learning_rate': 2e-06, 'epoch': 0.12}

# Step 500: Treino estabilizado
# {'loss': 1.0542, 'grad_norm': 11.7, 'learning_rate': 3e-06, 'epoch': 0.64}

# Rodando Avaliação (Evaluation)
# {'eval_loss': 1.0621, 'eval_runtime': 20.4, 'eval_samples_per_second': 38.2, 'epoch': 1.0}

# Step 1000: Segunda época, loss continua caindo
# {'loss': 0.9214, 'grad_norm': 12.3, 'learning_rate': 2.5e-06, 'epoch': 1.28}

# Rodando Avaliação Final
# {'eval_loss': 0.9412, 'eval_runtime': 19.8, 'eval_samples_per_second': 39.5, 'epoch': 2.0}
