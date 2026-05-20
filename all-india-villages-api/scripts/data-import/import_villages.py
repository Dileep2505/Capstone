import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine, text
from tqdm import tqdm
import uuid

print("🚀 IMPORT STARTED")

# =====================================
# DATABASE CONNECTION
# =====================================

DATABASE_URL = "postgresql://postgres:2505@localhost:5432/villagedb"

engine = create_engine(DATABASE_URL)

# =====================================
# DATASET DIRECTORY
# =====================================

DATASET_DIR = Path("./dataset")

excel_files = (
    list(DATASET_DIR.glob("*.xls")) +
    list(DATASET_DIR.glob("*.xlsx")) +
    list(DATASET_DIR.glob("*.ods"))
)

print(f"\n📁 Found {len(excel_files)} dataset files")

# =====================================
# CACHE MAPS
# =====================================

state_cache = {}
district_cache = {}
subdistrict_cache = {}

# =====================================
# CREATE INDIA COUNTRY
# =====================================

with engine.begin() as conn:

    existing_country = conn.execute(
        text("""
            SELECT id
            FROM "Country"
            WHERE code = :code
        """),
        {"code": "IND"}
    ).fetchone()

    if existing_country:
        country_id = existing_country[0]
    else:

        country_id = str(uuid.uuid4())

        conn.execute(
            text("""
                INSERT INTO "Country"
                (
                    id,
                    code,
                    name,
                    "createdAt",
                    "updatedAt"
                )
                VALUES
                (
                    :id,
                    :code,
                    :name,
                    NOW(),
                    NOW()
                )
            """),
            {
                "id": country_id,
                "code": "IND",
                "name": "India"
            }
        )

print("✅ India country ready")

# =====================================
# PROCESS FILES
# =====================================

for file in excel_files:

    print(f"\n📄 Processing {file.name}")

    try:

        # =========================
        # READ FILE
        # =========================

        if file.suffix == ".ods":
            df = pd.read_excel(file, engine="odf")
        else:
            df = pd.read_excel(file)

        # =========================
        # CLEAN COLUMNS
        # =========================

        df.columns = [str(col).strip() for col in df.columns]

        required_columns = [
            "MDDS STC",
            "STATE NAME",
            "MDDS DTC",
            "DISTRICT NAME",
            "MDDS Sub_DT",
            "SUB-DISTRICT NAME",
            "MDDS PLCN",
            "Area Name"
        ]

        missing = [
            col for col in required_columns
            if col not in df.columns
        ]

        if missing:
            print(f"❌ Missing columns in {file.name}")
            print(missing)
            continue

        # =========================
        # DROP NULLS
        # =========================

        df = df.dropna(subset=[
            "STATE NAME",
            "DISTRICT NAME",
            "SUB-DISTRICT NAME",
            "Area Name"
        ])

        # =========================
        # PROCESS ROWS
        # =========================

        with engine.begin() as conn:

            for _, row in tqdm(df.iterrows(), total=len(df)):

                state_code = str(row["MDDS STC"]).strip()
                state_name = str(row["STATE NAME"]).strip()

                district_code = str(row["MDDS DTC"]).strip()
                district_name = str(row["DISTRICT NAME"]).strip()

                subdistrict_code = str(row["MDDS Sub_DT"]).strip()
                subdistrict_name = str(row["SUB-DISTRICT NAME"]).strip()

                village_code = str(row["MDDS PLCN"]).strip()
                village_name = str(row["Area Name"]).strip()

                # =====================================
                # STATE
                # =====================================

                if state_code not in state_cache:

                    existing = conn.execute(
                        text("""
                            SELECT id
                            FROM "State"
                            WHERE code = :code
                        """),
                        {"code": state_code}
                    ).fetchone()

                    if existing:
                        state_id = existing[0]
                    else:

                        state_id = str(uuid.uuid4())

                        conn.execute(
                            text("""
                                INSERT INTO "State"
                                (
                                    id,
                                    code,
                                    name,
                                    "countryId",
                                    "createdAt",
                                    "updatedAt"
                                )
                                VALUES
                                (
                                    :id,
                                    :code,
                                    :name,
                                    :countryId,
                                    NOW(),
                                    NOW()
                                )
                            """),
                            {
                                "id": state_id,
                                "code": state_code,
                                "name": state_name,
                                "countryId": country_id
                            }
                        )

                    state_cache[state_code] = state_id

                state_id = state_cache[state_code]

                # =====================================
                # DISTRICT
                # =====================================

                district_key = f"{state_code}_{district_code}"

                if district_key not in district_cache:

                    existing = conn.execute(
                        text("""
                            SELECT id
                            FROM "District"
                            WHERE code = :code
                            AND "stateId" = :stateId
                        """),
                        {
                            "code": district_code,
                            "stateId": state_id
                        }
                    ).fetchone()

                    if existing:
                        district_id = existing[0]
                    else:

                        district_id = str(uuid.uuid4())

                        conn.execute(
                            text("""
                                INSERT INTO "District"
                                (
                                    id,
                                    code,
                                    name,
                                    "stateId",
                                    "createdAt",
                                    "updatedAt"
                                )
                                VALUES
                                (
                                    :id,
                                    :code,
                                    :name,
                                    :stateId,
                                    NOW(),
                                    NOW()
                                )
                            """),
                            {
                                "id": district_id,
                                "code": district_code,
                                "name": district_name,
                                "stateId": state_id
                            }
                        )

                    district_cache[district_key] = district_id

                district_id = district_cache[district_key]

                # =====================================
                # SUBDISTRICT
                # =====================================

                subdistrict_key = f"{district_code}_{subdistrict_code}"

                if subdistrict_key not in subdistrict_cache:

                    existing = conn.execute(
                        text("""
                            SELECT id
                            FROM "SubDistrict"
                            WHERE code = :code
                            AND "districtId" = :districtId
                        """),
                        {
                            "code": subdistrict_code,
                            "districtId": district_id
                        }
                    ).fetchone()

                    if existing:
                        subdistrict_id = existing[0]
                    else:

                        subdistrict_id = str(uuid.uuid4())

                        conn.execute(
                            text("""
                                INSERT INTO "SubDistrict"
                                (
                                    id,
                                    code,
                                    name,
                                    "districtId",
                                    "createdAt",
                                    "updatedAt"
                                )
                                VALUES
                                (
                                    :id,
                                    :code,
                                    :name,
                                    :districtId,
                                    NOW(),
                                    NOW()
                                )
                            """),
                            {
                                "id": subdistrict_id,
                                "code": subdistrict_code,
                                "name": subdistrict_name,
                                "districtId": district_id
                            }
                        )

                    subdistrict_cache[subdistrict_key] = subdistrict_id

                subdistrict_id = subdistrict_cache[subdistrict_key]

                # =====================================
                # VILLAGE
                # =====================================

                existing_village = conn.execute(
                    text("""
                        SELECT id
                        FROM "Village"
                        WHERE code = :code
                    """),
                    {"code": village_code}
                ).fetchone()

                if not existing_village:

                    village_id = str(uuid.uuid4())

                    conn.execute(
                        text("""
                            INSERT INTO "Village"
                            (
                                id,
                                code,
                                name,
                                "subDistrictId",
                                "createdAt",
                                "updatedAt"
                            )
                            VALUES
                            (
                                :id,
                                :code,
                                :name,
                                :subDistrictId,
                                NOW(),
                                NOW()
                            )
                        """),
                        {
                            "id": village_id,
                            "code": village_code,
                            "name": village_name,
                            "subDistrictId": subdistrict_id
                        }
                    )

        print(f"✅ Finished {file.name}")

    except Exception as e:

        print(f"\n❌ ERROR in {file.name}")
        print(str(e))

print("\n🎉 IMPORT COMPLETED")