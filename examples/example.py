import pandas as pd
import streamlit as st
from st_datatables import st_datatable


st.title("st-datatables demo")

df = pd.read_csv(
    "https://raw.githubusercontent.com/fivethirtyeight/data/master/airline-safety/airline-safety.csv"
)

st_datatable(df)
