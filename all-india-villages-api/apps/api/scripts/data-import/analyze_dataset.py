import pandas as pd
from pathlib import Path

DATASET_DIR = Path("./dataset")

excel_files = (
    list(DATASET_DIR.glob("*.xls")) +
    list(DATASET_DIR.glob("*.xlsx")) +
    list(DATASET_DIR.glob("*.ods"))
)

print(f"Found {len(excel_files)} Excel files")

for file in excel_files:
    print("\n==============================")
    print(f"FILE: {file.name}")
    print("==============================")

    df = pd.read_excel(file)

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nShape:")
    print(df.shape)

    print("\nSample Data:")
    print(df.head())

    print("\nNull Counts:")
    print(df.isnull().sum())