# st-datatables

A component that renders a `pandas.DataFrame` as a jQuery `DataTable`. For more information on DataTables see [datatables.net](https://www.datatables.net).


## Install

```shell
pip install st-datatables
```

## Usage

Create the file like the one at `examples/example.py`:

```python
import pandas as pd
import streamlit as st
from st_datatables import st_datatable


st.title("st-datatables demo")

df = pd.read_csv(
    "https://raw.githubusercontent.com/fivethirtyeight/data/master/airline-safety/airline-safety.csv"
)

st_datatable(df)
```

Then run the file with streamlit:

```shell
streamlit run example.py
```

## Alternatives

This is an alternative to `streamlit-aggrid`, check it out [here](https://github.com/PablocFonseca/streamlit-aggrid).
